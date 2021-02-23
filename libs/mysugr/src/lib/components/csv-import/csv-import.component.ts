import {Component} from '@angular/core';
import {CsvImportService} from "../../services/csv-import.service";
import {ReadFile, ReadMode} from "ngx-file-helpers";

@Component({
  selector: 'dt-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss']
})
export class CsvImportComponent {

  public readMode = ReadMode.text;

  constructor(private csvImport: CsvImportService) {}

  onFilePicked(readFile: ReadFile) {
    this.csvImport.load(readFile.content);
  }



}
