import {Component, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
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
export class MysugrTableComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  private timeOfDayTransformation = new TimeOfDayTransformation();

  data: ITimeOfDayGroups[];
  working = false;

  constructor(private csvImport: CsvImportService,
              private dataHolderService: DataHolderService,
              private ngZone: NgZone) {

  }

  private setWorking(working: boolean) {
    if (working) {
      this.working = true;
    }

    setTimeout(() => {
      this.working = false;
    }, 1000);

  }

  ngOnInit(): void {
    this.subscription.add(
      this.csvImport.getResult().subscribe((result) => {

        this.setWorking(result.loading);

        if (!isEmpty(result.data)) {
          this.dataHolderService.setOriginData(result.data);
        }
      })
    )

    this.subscription.add(
      this.dataHolderService.getData().subscribe((data) => {
        this.data = this.timeOfDayTransformation.transform(data);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
