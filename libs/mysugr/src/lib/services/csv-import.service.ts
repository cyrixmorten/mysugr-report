import {Injectable} from '@angular/core';
import {Papa, ParseResult} from 'ngx-papaparse';
import {BehaviorSubject, Observable} from "rxjs";

export interface ICsvResult extends ParseResult {
  loading: boolean;
}

const emptyResult = {
  loading: false,
  data: [],
  errors: [],
  meta: {} as any
}

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  private subject = new BehaviorSubject<ICsvResult>(emptyResult);

  constructor(private papa: Papa) {}

  load(csv: string): void {

    this.subject.next({
      ...emptyResult,
      loading: true
    });

    setTimeout(() => {
      this.papa.parse(csv, {
        complete: (results, parsedFile) => {
          this.subject.next({
            ...results,
            loading: false
          });
        },
        header: true,
        // Add your options here
      });
    }, 1000);

  }


  getResult(): Observable<ICsvResult> {
    return this.subject.asObservable();
  }
}
