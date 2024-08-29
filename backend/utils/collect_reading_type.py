from selenium.webdriver.chrome.webdriver import WebDriver
import time

from utils.parsing import *
from utils.selectors import Selectors


def collect_reading_type(driver: WebDriver, resource_type: str) -> list:
    """
    Navigate through the switch2 dashboard and collect data about one of three reading types:
        - cold water
        - heater
        - electricity

    Once the results are stored in a dict, they are persisted to the database (see `persist.py`)
    """
    units = "kwh" if (resource_type in ["electricity", "heater"]) else "m3"
    reading_option_xpath = (
        Selectors.COLD_WATER_OPTION_XPATH
        if (resource_type == "cold_water")
        else (
            Selectors.HEATER_OPTION_XPATH
            if (resource_type == "heater")
            else Selectors.ELECTRICITY_OPTION_XPATH
        )
    )
    driver.find_element_by_xpath(reading_option_xpath).click()
    driver.find_element_by_xpath(Selectors.SHOW_ALL_READINGS_OPTION_XPATH).click()
    readings = []
    driver.find_element_by_id("ReloadButton").click()
    time.sleep(5)
    rows = driver.find_elements_by_class_name(Selectors.TABLE_ROW_XPATH)
    for row in rows:
        date = row.find_element_by_xpath(Selectors.DATE_ROW_XPATH).text
        amount = row.find_element_by_class_name(Selectors.AMOUNT_ROW_CLASSNAME).text
        readings.append(
            {
                "date": parse_date_string(date),
                f"amount ({units})": parse_amount_string(amount),
            }
        )
    return readings
