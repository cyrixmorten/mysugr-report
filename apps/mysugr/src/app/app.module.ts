import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LibsMysugrModule} from '@diabetes-tools/libs/mysugr';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    LibsMysugrModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
