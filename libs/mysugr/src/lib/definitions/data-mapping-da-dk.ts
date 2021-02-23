import {DATA_KEY, IDataMapping, TAG} from "./data-mapping.interface";

export const danishDataMap: IDataMapping = {
  format: {
    locale: 'da',
    date: 'dd-MM-yyyy',
    time: 'HH:mm:ss'
  },
  entry: {
    [DATA_KEY.ACTIVITY_INTENSITY]: "Aktivitets intensitet (1: Bekvem, 2: Normal, 3: Krævende)",
    [DATA_KEY.ACTIVITY_DESCRIPTION]: "Aktivitetsbeskrivelse",
    [DATA_KEY.ACTIVITY_DURATION]: "Aktivitetsvarighed (minutter)",
    [DATA_KEY.INSULIN_BASIC]: "Basalinjektion enheder",
    [DATA_KEY.BLOODSUGAR]: "Blodsukkermåling (mmol/L)",
    [DATA_KEY.BLOODPRESSURE]: "Blodtryk",
    [DATA_KEY.BOLUS]: "Bolus (måltid)",
    [DATA_KEY.BOLUS_INJECTION_PEN]: "Bolusinjektion enheder (pen)",
    [DATA_KEY.BOLUS_INJECTION_PUMP]: "Bolusinjektion enheder (pumpe)",
    [DATA_KEY.DATE]: "Dato",
    [DATA_KEY.HBA1C]: "HbA1c (mmol/mol)",
    [DATA_KEY.INUSULIN_CORRECTION]: "Insulin (korrektion)",
    [DATA_KEY.KETONES]: "Ketoner",
    [DATA_KEY.BODY_WEIGHT]: "Kropsvægt (kg)",
    [DATA_KEY.CARBS]: "Kulhydrater mad (Gram, faktor 1)",
    [DATA_KEY.MEDICIN]: "Medicin",
    [DATA_KEY.TEMPORARY_BASAL_PERCENT]: "Midlertidig basal (%)",
    [DATA_KEY.TEMPORARY_BASAL_MINUTES]: "Midlertidig basal (minutter)",
    [DATA_KEY.MEAL_DESCRIPTION]: "Måltidsbeskrivelser",
    [DATA_KEY.NOTE]: "Notat",
    [DATA_KEY.STEPS]: "Skridt",
    [DATA_KEY.PLACE]: "Sted",
    [DATA_KEY.TAGS]: "Tags",
    [DATA_KEY.TIME]: "Tid",
    [DATA_KEY.FOOD_TYPE]: "Type mad",
  },
  tag: {
    [TAG.BEFORE_MEAL]: "Før måltidet",
    [TAG.AFTER_MEAL]: "Efter måltidet",
    [TAG.FASTING]: "Fastende",
    [TAG.LUNCH]: "Frokost",
    [TAG.BREAKFAST]: "Morgenmad",
    [TAG.DINNER]: "Aftensmad",
    [TAG.DRIVING]: "Kører",
    [TAG.BEDTIME]: "Sengetid"
  }
}
