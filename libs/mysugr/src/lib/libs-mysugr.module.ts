import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {MysugrTableComponent} from "./components/table/mysugr-table.component";
import {MatTableModule} from "@angular/material/table";
import {CsvImportComponent} from './components/csv-import/csv-import.component';
import {MainComponent} from './components/main/main.component';
import {MatDividerModule} from "@angular/material/divider";
import {FlexLayoutModule} from "@angular/flex-layout";
import {danishDataMap} from "./definitions/data-mapping-da-dk";
import {SELECTED_DATA_MAPPING} from "./definitions/data-mapping.inject.token";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgxPrintModule} from "ngx-print";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxFileHelpersModule} from "ngx-file-helpers";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Route[] = [
  {path: '', component: MainComponent},
];

const angularModules = [
  CommonModule, HttpClientModule, FlexLayoutModule,
  MatDividerModule, MatTableModule, MatButtonModule,
  MatIconModule, MatSnackBarModule
]
const translationModules = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
]
const featureModules = [NgxFileHelpersModule, NgxPrintModule]

@NgModule({
  imports: [
    ...angularModules,
    ...featureModules,
    ...translationModules,
    RouterModule.forRoot(routes)
  ],
  declarations: [MysugrTableComponent, CsvImportComponent, MainComponent],
  providers: [{provide: SELECTED_DATA_MAPPING, useValue: danishDataMap}]
})
export class LibsMysugrModule {
}
