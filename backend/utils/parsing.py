import re
import datetime


def parse_amount_string(amount_string: str) -> int:
    """
    Process a reading.
    The switch2 dashboard shows each reading as a number string followed by a single space and the units (kwh, m3, etc.)
    @:return the number portion of the reading, as an int (the dashboard uses the same precision)
    """

    return int(re.sub("[^0-9]|m|3$", "", amount_string).strip())


def parse_date_string(date_string: str) -> str:
    """
    Process a date cell in the switch2 dashboard
    :param date_string: has the following format:
        - day of month, followed by 'st/nd/rd/th'
        - month, fully spelled out
        - year, 4 digits
    :return: the same date, in a simpler format: dd-mm-yyyy
    """
    return (
        datetime.datetime.strptime(re.sub("th|st|rd|nd", "", date_string, 1), "%d %B %Y")
    ).strftime("%m-%d-%Y")
