import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {DataHolderService} from "../../services/data-holder.service";
import {ITimeOfDayGroups, TimeOfDayTransformation} from "../../transform/time.of.day.transformation";
import {CsvImportService} from "../../services/csv-import.service";
import {isEmpty} from "lodash-es";

@Component({
  selector: 'dt-mysugr-table',
  templateUrl: './mysugr-table.component.html',
  styleUrls: ['./mysugr-table.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MysugrTableComponent implements OnInit {

  displayedColumns: string[] = ['date', 'morning', 'noon', 'evening', 'night'];
  dataSource: MysugrDataSource;
  hasData = false;

  constructor(private csvImport: CsvImportService, private dataHolderService: DataHolderService) {
    this.dataSource = new MysugrDataSource(dataHolderService);
  }

  ngOnInit(): void {
    this.csvImport.getResult().subscribe((result) => {
      if (!isEmpty(result.data)) {
        this.dataHolderService.setOriginData(result.data);

        this.hasData = true;
      }
    })
  }

}


export class MysugrDataSource extends DataSource<ITimeOfDayGroups> {

  private transformed = new BehaviorSubject([]);

  private dataSubscription: Subscription;

  private timeOfDayTransformation = new TimeOfDayTransformation();

  constructor(private dataHolder: DataHolderService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ITimeOfDayGroups[]> {
    this.dataSubscription = this.dataHolder.getData().subscribe((data) => {
      const transformed = this.timeOfDayTransformation.transform(data);

      console.log('transformed', transformed);

      this.transformed.next(transformed);
    })

    return this.transformed.asObservable();
  }

  disconnect() {
    this.dataSubscription.unsubscribe()
  }
}
