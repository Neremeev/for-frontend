/**
 * Из расчета 23ч - 8ч = 15ч = 900мин = 100% ширины
 */

export const START_HOUR = 8;

export const END_HOUR = 23;

export const ONE_HOUR_WIDTH = 100 / (END_HOUR - START_HOUR);

export const ONE_MINUTE_WIDTH = ONE_HOUR_WIDTH / 60;

export const $mobile = `@media (max-width: 768px)`;

export const TIME_FORMAT = "HH:mm";

export const CALENDAR_DATE_FORMAT = "DD MMMM YYYY";

export const INPUT_DATE_FORMAT = "YYYY-MM-DD";
