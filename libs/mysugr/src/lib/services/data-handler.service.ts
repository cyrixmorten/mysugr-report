import {Injectable} from '@angular/core';
import {CsvImportService} from "./csv-import.service";
import {DataHolderService} from "./data-holder.service";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(
    private csvImport: CsvImportService,
    private dataHolder: DataHolderService) {

    this.subscribeToImportedCSVs();
  }

  private subscribeToImportedCSVs() {
    console.log('subscribeToImportedCSVs')

  }

}
