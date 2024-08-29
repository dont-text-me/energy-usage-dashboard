import json
import os
from logging import Logger

import requests


def persist(
    cold_water_readings: list,
    heater_readings: list,
    electricity_readings: list,
    logger: Logger,
) -> None:
    rest_api_token = os.environ["KV_REST_API_TOKEN"]
    rest_api_url = os.environ["KV_REST_API_URL"]
    headers = {"Authorization": f"Bearer {rest_api_token}"}
    logger.info("uploading cold water readings...")

    for reading_kind, reading_data in zip(
        ["cold water", "heater", "electricity"],
        [cold_water_readings, heater_readings, electricity_readings],
    ):
        logger.info(f"uploading {reading_kind} readings...")
        url = f'{rest_api_url}/set/{reading_kind.replace(' ', '_')}_readings'
        resp = requests.post(url=url, headers=headers, data=json.dumps(reading_data))
        if resp.status_code == 200:
            logger.info(f"uploading {reading_kind} readings succeeded.")
        else:
            logger.error(f"uploading {reading_kind} readings failed.")
