# Energy/water consumption monitor dashboard

This project is a simple dashboard to allow me to see how much water, electricity and heating my home consumes and how my daily usage changes throughout the year.
The system contains of threee components:

  - A React/NextJS frontend, hosted on Vercel
  - A python script to scrape my usage data from the energy provider's website (switch2) and send it to the database. The script uses selenium to navigate through the dashboard and gather the data
  - A redis database, also hosted on Vercel

The script to gather data runs nightly (to roughly match the schedule at which new meter readings are posted), which is done through scheduling github actions jobs.

> [!NOTE]  
> The current design of the system aims to be as simple as possible, taking into account things such as the short duration of my lease and the low precision of the meter readings.
> Because of this, the simplest approach to storing the readings is to simply rewrite the entire history at the end of each github actions job.
> While this may become inefficient as time goes on, it is highly unlikely to cause any noticeable delays in the foreseeable future, as the system will only ever see (365 * 3) readings over its entire deployment. Currently, the entire history takes less than 10kB of disk space.

## Environment variables

The system requires 4 environment variables:

  - `SWITCH2_USERNAME`/`SWITCH2_PASSWORD`, the credentials to the switch2 dashboard.
  - `KV_REST_API_TOKEN`/`KV_REST_API_URL`, the credentials to Vercel KV store (see [docs](https://vercel.com/docs/storage/vercel-kv))
