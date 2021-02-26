import {DATA_KEY, IDataMapping, TAG} from "../definitions/data-mapping.interface";
import {Inject, Injectable} from "@angular/core";
import {SELECTED_DATA_MAPPING} from "../definitions/data-mapping.inject.token";
import {DateTime} from "luxon"
import {BehaviorSubject, Observable} from "rxjs";

export interface IInsulinTaken {
  bolus: number;
  basic: number;
  correction: number;
}

export interface IMysgrData {
  date: DateTime;
  bloodsugar: number;
  insulin: IInsulinTaken;
  note: string;
  tags: TAG[];
}

export interface IDataHolder {
  setOriginData(data: any): void;
  getOriginData(): any;
  getData(): Observable<IMysgrData[]>;
}

@Injectable({
  providedIn: 'root'
})
export class DataHolderService implements IDataHolder {

  private dataSubject = new BehaviorSubject<IMysgrData[]>([]);

  private originData: any;
  private convertedData: IMysgrData[];

  constructor(@Inject(SELECTED_DATA_MAPPING) private dataMapping: IDataMapping) {}

  setOriginData(data: any) {
    this.originData = data;
    this.convertedData = this.convertData(data);

    this.dataSubject.next(this.convertedData);
  }

  getOriginData(): any {
    return this.originData;
  }


  getData(): Observable<IMysgrData[]> {
    return this.dataSubject.asObservable();
  }

  private convertData(data): IMysgrData[] {
    return data.map((entry) => this.convertEntry(entry));
  }

  private convertEntry(entry: any): IMysgrData {
    return {
      date: this.getDate(entry),
      bloodsugar: this.getNumber(entry, DATA_KEY.BLOODSUGAR),
      insulin: {
        bolus: this.getNumber(entry, DATA_KEY.BOLUS),
        basic: this.getNumber(entry, DATA_KEY.INSULIN_BASIC),
        correction: this.getNumber(entry, DATA_KEY.INUSULIN_CORRECTION),
      },
      tags: this.getTags(entry),
      note: this.getString(entry, DATA_KEY.NOTE)
    }
  }

  private getNumber(entry: any, key: DATA_KEY): number {
    const value = this.getString(entry, key);

    if (!!value) {
      return Number.parseFloat(value.replace(',', '.'))
    }
  }

  private getDate(entry: any): DateTime {
    const dateString = this.getString(entry, DATA_KEY.DATE);
    const timeString = this.getString(entry, DATA_KEY.TIME);

    const {date, time, locale} = this.dataMapping.format;

    const fullDateString = `${dateString} ${timeString}`;
    const formatString = `${date} ${time}`;

    return DateTime.fromFormat(
      fullDateString,
      formatString,
      {
        locale
      }
    );
  }

  private getString(entry, key: DATA_KEY): string {
    const localizedEntryKey = this.dataMapping.entry[key] as any;

    if (!localizedEntryKey) {
      throw new Error('Did not find entry for key: ' + key);
    }

    return entry[localizedEntryKey];
  }


  private findTag(localizedTag: string): TAG {
    const allLocalizedTags = this.dataMapping.tag;
    for (const key of Object.keys(allLocalizedTags)) {
      const localizedValue = allLocalizedTags[key];
      if (localizedValue === localizedTag) {
        return TAG[key];
      }
    }
  }

  private getTags(entry: any): TAG[] {
    const tagsString = this.getString(entry, DATA_KEY.TAGS);

    if (!!tagsString) {
      const tagsArray = tagsString.split(',');
      const foundTagEnums = tagsArray.map((tag) => this.findTag(tag));

      return foundTagEnums.filter((tag) => tag !== undefined);
    }

    return [];
  }


}
