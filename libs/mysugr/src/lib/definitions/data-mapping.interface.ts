export enum DATA_KEY {
  ACTIVITY_INTENSITY = "ACTIVITY_INTENSITY",
  ACTIVITY_DESCRIPTION = "ACTIVITY_DESCRIPTION",
  ACTIVITY_DURATION = "ACTIVITY_DURATION",
  INSULIN_BASIC = "INSULIN_BASIC",
  BLOODSUGAR = "BLOODSUGAR",
  BLOODPRESSURE = "BLOODPRESSURE",
  BOLUS = "BOLUS",
  BOLUS_INJECTION_PEN = "BOLUS_INJECTION_PEN",
  BOLUS_INJECTION_PUMP = "BOLUS_INJECTION_PUMP",
  DATE = "DATE",
  HBA1C = "HBA1C",
  INUSULIN_CORRECTION = "INUSULIN_CORRECTION",
  KETONES = "KETONES",
  BODY_WEIGHT = "BODY_WEIGHT",
  CARBS = "CARBS",
  MEDICIN = "MEDICIN",
  TEMPORARY_BASAL_PERCENT = "TEMPORARY_BASAL_PERCENT",
  TEMPORARY_BASAL_MINUTES = "TEMPORARY_BASAL_MINUTES",
  MEAL_DESCRIPTION = "MEAL_DESCRIPTION",
  NOTE = "NOTE",
  STEPS = "STEPS",
  PLACE = "PLACE",
  TAGS = "TAGS",
  TIME = "TIME",
  FOOD_TYPE = "FOOD_TYPE",
}

export enum TAG {
  BREAKFAST= "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  BEFORE_MEAL = "BEFORE_MEAL",
  AFTER_MEAL = "AFTER_MEAL",
  FASTING = "FASTING",
  DRIVING = "DRIVING",
  BEDTIME = "BEDTIME"
}


export interface IDataMapping {
  entry: {
    [key in DATA_KEY]: string
  };
  tag: {
    [key in TAG]: string
  };
  format: {
    // luxon used for formatting dates
    // https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
    locale: 'da' | 'en'
    date: string, // example: dd-MM-yyyy
    time: string  // example: HH:mm:ss
  }
}
