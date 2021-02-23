import {InjectionToken} from "@angular/core";
import {IDataMapping} from "./data-mapping.interface";

export const SELECTED_DATA_MAPPING = new InjectionToken<IDataMapping>('data.mapping');
