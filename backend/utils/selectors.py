from enum import StrEnum


class Selectors(StrEnum):
    ELECTRICITY_OPTION_XPATH = '//select/option[contains(text(), "Electricity")]'
    COLD_WATER_OPTION_XPATH = '//select/option[contains(text(), "Cold Water")]'
    HEATER_OPTION_XPATH = '//select/option[contains(text(), "Heat Meter")]'
    SHOW_ALL_READINGS_OPTION_XPATH = '//select/option[text()="All"]'
    DATE_ROW_XPATH = ".//div[contains(@aria-labelledby, 'DateRow')]"
    AMOUNT_ROW_CLASSNAME = "meter-reading-history-table-data-amount-row-item"
    TABLE_ROW_XPATH = "meter-reading-history-table-data-row.desktop-layout"
