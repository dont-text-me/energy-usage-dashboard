import json
import sys
import time
import logging
import os

from requests_html import HTMLSession
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from utils.urls import Urls
from utils.collect_reading_type import collect_reading_type

# Use requests-html to login and obtain the cookie
logging.basicConfig(level=logging.INFO)
session = HTMLSession()
initial_res = session.get(Urls.LOGIN)
logging.info("Making initial request to obtain token")
verification_token = initial_res.html.find("#LoginForm > input", first=True).attrs["value"]
logging.info("Logging in")
login_res = session.post(
    "https://my.switch2.co.uk/Login",
    data={
        "__RequestVerificationToken": verification_token,
        "UserName": os.environ["SWITCH2_USERNAME"],
        "Password": os.environ["SWITCH2_PASSWORD"],
    },
)
if login_res.status_code != 200:
    logging.error("could not log in, aborting...")
    sys.exit(1)
logging.info("logged in, navigating to usage page")

cookies = session.cookies.items()
# Use selenium to click through the website and gather the energy, hot and cold water data
chrome_options = Options()
chrome_options.headless = True
driver = webdriver.Chrome(options=chrome_options)
driver.get(Urls.READING_HISTORY)
for name, value in cookies:
    driver.add_cookie({"name": name, "value": value})
driver.refresh()
# Navigate to the usage page. It opens on the cold water meter, showing the first 10 records
driver.find_element_by_link_text("Usage").click()
logging.info("Opened usage page")
time.sleep(5)
logging.info("collecting electricity readings...")
electricity_readings = collect_reading_type(driver, "electricity")
logging.info(f"found {len(electricity_readings)} readings")
with open("electricity_readings.json", "w") as outfile:
    json.dump(electricity_readings, outfile)
# now look at cold water readings
logging.info("collecting cold water readings...")
cold_water_readings = collect_reading_type(driver, "cold_water")
with open("cold_water_readings.json", "w") as outfile:
    json.dump(cold_water_readings, outfile)
logging.info(f"found {len(cold_water_readings)} readings")
# and finally, the heat meter
logging.info("collecting heater readings...")
heating_readings = collect_reading_type(driver, "heater")
with open("heating_readings.json", "w") as outfile:
    json.dump(heating_readings, outfile)
logging.info(f"found {len(heating_readings)} readings")

# wrapping up: close the session and quit the browser
session.close()
driver.quit()
driver.stop_client()
