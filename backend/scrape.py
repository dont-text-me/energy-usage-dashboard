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
from utils.persist import persist

# Use requests-html to log in and obtain the cookie
logger = logging.getLogger("switch2-scraper")
logging.basicConfig(level=logging.INFO)
if "SWITCH2_USERNAME" not in os.environ or "SWITCH2_PASSWORD" not in os.environ:
    logging.error("Missing required environment variables, aborting...")
    sys.exit(1)

session = HTMLSession()
initial_res = session.get(Urls.LOGIN)
logger.info("Making initial request to obtain token")
verification_token = initial_res.html.find("#LoginForm > input", first=True).attrs["value"]
logger.info("logger in")
login_res = session.post(
    "https://my.switch2.co.uk/Login",
    data={
        "__RequestVerificationToken": verification_token,
        "UserName": os.environ["SWITCH2_USERNAME"],
        "Password": os.environ["SWITCH2_PASSWORD"],
    },
)
if login_res.status_code != 200:
    logger.error("could not log in, aborting...")
    sys.exit(1)
logger.info("logged in, navigating to usage page")

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
logger.info("Opened usage page")
time.sleep(5)
logger.info("collecting electricity readings...")
electricity_readings = collect_reading_type(driver, "electricity")
logger.info(f"found {len(electricity_readings)} readings")
# now look at cold water readings
logger.info("collecting cold water readings...")
cold_water_readings = collect_reading_type(driver, "cold_water")
logger.info(f"found {len(cold_water_readings)} readings")
# and finally, the heat meter
logger.info("collecting heater readings...")
heating_readings = collect_reading_type(driver, "heater")
logger.info(f"found {len(heating_readings)} readings")
logger.info("storing to redis...")
persist(cold_water_readings, heating_readings, electricity_readings, logger)
logger.info("all done, wrapping up...")
# wrapping up: close the session and quit the browser
session.close()
driver.quit()
driver.stop_client()
