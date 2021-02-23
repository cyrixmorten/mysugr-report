import {Injectable} from '@angular/core';
import {Papa, ParseResult} from 'ngx-papaparse';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  private subject = new BehaviorSubject<ParseResult>({
    data: [],
    errors: [],
    meta: {} as any
  });

  constructor(private papa: Papa) {}

  load(csv: string): void {

    this.papa.parse(csv, {
      complete: (results, parsedFile) => {
        console.log('Parsed: ', results, parsedFile);
        this.subject.next(results);
      },
      header: true,
      // Add your options here
    });

  }


  getResult(): Observable<ParseResult> {
    return this.subject.asObservable();
  }
}
