import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import defaultLanguage from '../../../../assets/i18n/da.json';

@Component({
  selector: 'diabetes-tools-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(translate: TranslateService) {
    translate.setTranslation('da', defaultLanguage);
    translate.setDefaultLang('da');
  }


}
