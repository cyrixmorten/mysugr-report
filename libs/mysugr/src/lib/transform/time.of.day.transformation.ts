import {IMysgrData} from "../services/data-holder.service";
import {ITransformation} from "./transformation";
import {DateTime} from "luxon"
import {groupBy, map, head} from "lodash-es";

export interface IBloodsugarInsulin {
  entry: IMysgrData;
  bloodsugar: number;
  insulin: number;
}

export interface ITimeOfDayData {
  data: IMysgrData[];
  // first matching reading containing BOLUS, BASIC or
  // CORRECTION and the associated bloodsugar and
  // insulin intake values.
  bolus: IBloodsugarInsulin;
  basic: IBloodsugarInsulin;
  correction: IBloodsugarInsulin;
}

export interface ITimeOfDayGroups {
  date: Date;
  // 06:00-12:00
  morning: ITimeOfDayData;
  // 12:00-17:00
  noon: ITimeOfDayData;
  // 17:00-21:00
  evening: ITimeOfDayData;
  // 21:00-00:00
  night: ITimeOfDayData;
  // all notes for the day
  notes: string[];
}

interface FilterByTimeParams {
  data: IMysgrData[];
  hourStart: number;
  hourEnd: number;
}

/**
 * Group by day and select data
 *
 * Example output:
 * [
 *      {
 *        date: '02-14-2021',
 *        morning: morning_data[],
 *        noon: noon_data[],
 *        evening: evening_data[],
 *        night: night_data[]
 *      },
 *      {
 *        date: '02-15-2021',
 *        morning: morning_data[],
 *        noon: noon_data[],
 *        evening: evening_data[],
 *        night: night_data[]
 *      },
 * ]
 */
export class TimeOfDayTransformation implements ITransformation<IMysgrData, ITimeOfDayGroups> {

  constructor() {
  }

  public transform(data: IMysgrData[]): ITimeOfDayGroups[] {

    const groupedByDate = this.groupByDate(data);

    return groupedByDate.map((grouped) => {
      const {date, dayData} = grouped;

      const dayNotes = dayData.map((entry) => entry.note).filter(note => !!note);

      return {
        date: date.toJSDate(),
        notes: dayNotes,
        morning: this.getTimeOfDayData({data: dayData, hourStart: 6, hourEnd: 12}),
        noon: this.getTimeOfDayData({data: dayData, hourStart: 12, hourEnd: 17}),
        evening: this.getTimeOfDayData({data: dayData, hourStart: 17, hourEnd: 21}),
        night: this.getTimeOfDayData({data: dayData, hourStart: 21, hourEnd: 24}),
      }
    });
  }

  private getTimeOfDayData({data, hourStart, hourEnd}: FilterByTimeParams): ITimeOfDayData {
    const matchingTimeWindow = this.filterByTime({data, hourStart, hourEnd});

    const bolusEntry = matchingTimeWindow.find((entry) => entry.insulin.bolus);
    const basicEntry = matchingTimeWindow.find((entry) => entry.insulin.basic);
    const correctionEntry = matchingTimeWindow.find((entry) => entry.insulin.correction);

    return {
      data: matchingTimeWindow,
      bolus: bolusEntry ? {
        entry: bolusEntry,
        bloodsugar: bolusEntry.bloodsugar,
        insulin: bolusEntry.insulin.bolus,
      }: undefined,
      basic: basicEntry ? {
        entry: basicEntry,
        bloodsugar: basicEntry.bloodsugar,
        insulin: basicEntry.insulin.basic
      }: undefined,
      correction: correctionEntry ? {
        entry: correctionEntry,
        bloodsugar: correctionEntry.bloodsugar,
        insulin: correctionEntry.insulin.correction
      } : undefined,
    }
  }


  private filterByTime({data, hourStart, hourEnd}: FilterByTimeParams) {

    const withinTimeWindow = (d: IMysgrData) => {
      const hour = d.date.hour;
      return hour > hourStart && (hour === 0 ? 24 : hour) < hourEnd;
    }

    return data.filter(withinTimeWindow);
  }

  private groupByDate(data: IMysgrData[]): { key: string, date: DateTime, dayData: IMysgrData[] }[] {
    const grouped = groupBy(data, (entry: IMysgrData) => {
      return entry.date.toFormat('dd-MM-yyyy');
    });

    return map(grouped, (dayData: IMysgrData[], key: string) => ({
      key,
      date: head(dayData).date,
      dayData
    }))
  }

}
