# Spain Electricity Prices – PVPC & Spot, Hourly (REE) ⚡

Get the **official hourly electricity prices in Spain** straight from **Red Eléctrica** (REData API):

- **PVPC 2.0TD**: the regulated tariff that millions of Spanish households pay, hour by hour (energy, network tolls and charges, before taxes).
- **Day-ahead spot market** (OMIE, Spanish zone): hourly averages and, since October 2025, the 15-minute prices.

Today, **tomorrow** (as soon as it is published) or **any date range since 2021**, with the 2.0TD tariff period of every hour (peak, mid-peak, off-peak), its rank within the day, and the cheapest hours and time windows.

No scraping, no API key, no proxies.

## What can you do with it?

- 🏠 **Home automation**: run it every evening and switch on the heat pump, EV charger, water heater or washing machine in the cheapest hours of tomorrow (Home Assistant, Node-RED, Zapier, Make, webhooks…).
- 📱 **Apps, bots and websites**: show today's and tomorrow's price by hour, with ready-made rank and price level.
- 📊 **Energy analysis**: years of hourly PVPC and spot prices for reports, forecasting models or solar and battery sizing.
- 🏭 **Businesses**: plan consumption around peak hours and check the market price you are indexed to.

## Input

All fields are optional. With no input you get **today and tomorrow, hour by hour**.

| Field | What it does |
|---|---|
| **Start date / End date** | Any range from 2021-06-01 (PVPC) or 2014-04-01 (spot only) up to tomorrow. Long ranges are fine. |
| **Include tomorrow** | With no dates, also return tomorrow. Spot is published around 13:00 and PVPC around 20:30 (Spanish time). |
| **Output** | One row per hour, or one row per day with averages, min, max, cheapest hours and the cheapest 2, 3 and 4-hour windows. |
| **Only the N cheapest hours of each day** | E.g. `4` returns only the 4 cheapest hours of each day. |
| **Tariff periods** | Keep only P1 (peak), P2 (mid-peak) or P3 (off-peak) hours. |
| **Include 15-minute spot prices** | Adds the four quarter-hour market prices of each hour. |
| **Maximum results** | Limit the number of rows. |

### Example: the 4 cheapest hours of tomorrow

```json
{
  "startDate": "2026-10-15",
  "cheapestHoursPerDay": 4
}
```

## Output (hourly)

```json
{
  "date": "2026-10-14",
  "hour": 0,
  "startTime": "2026-10-14T00:00:00+02:00",
  "endTime": "2026-10-14T01:00:00+02:00",
  "pvpcEURPerMWh": 185.98,
  "pvpcEURPerKWh": 0.18598,
  "spotEURPerMWh": 207.49,
  "spotEURPerKWh": 0.20749,
  "tariffPeriod": "P3",
  "tariffPeriodName": "off-peak",
  "weekday": "Wednesday",
  "offPeakDay": false,
  "dayRank": 11,
  "rankedBy": "pvpc",
  "priceLevel": "medium",
  "vsDayAveragePct": -16,
  "isCheapestHour": false,
  "isMostExpensiveHour": false,
  "source": "Red Eléctrica (REData API) – PVPC and day-ahead market prices, peninsular system"
}
```

- `dayRank`: 1 = cheapest hour of the day. Ranks use PVPC, or the spot price while tomorrow's PVPC is not published yet (`rankedBy`).
- `priceLevel`: `low`, `medium` or `high` (thirds of the day).
- `tariffPeriod`: 2.0TD periods. Weekdays: P1 10–14 h and 18–22 h, P2 8–10 h, 14–18 h and 22–24 h, P3 0–8 h. Weekends and national fixed-date holidays are P3 all day.
- Times are Spanish peninsular time with the UTC offset. Daylight-saving days have 23 or 25 hours, and the repeated hour keeps its own offset.

## Output (daily)

```json
{
  "date": "2026-03-29",
  "weekday": "Sunday",
  "offPeakDay": true,
  "hours": 23,
  "pvpcPublished": true,
  "pvpcAverageEURPerKWh": 0.09436,
  "pvpcMinEURPerKWh": 0.08477,
  "pvpcMinHour": 19,
  "pvpcMaxEURPerKWh": 0.11025,
  "pvpcMaxHour": 8,
  "pvpcAverageByPeriodEURPerKWh": { "P1": null, "P2": null, "P3": 0.09436 },
  "spotAverageEURPerMWh": 0.18,
  "spotMinEURPerMWh": -9.82,
  "spotMaxEURPerMWh": 12.52,
  "cheapestHours": [19, 10, 12, 14, 20, 11],
  "cheapest2hWindow": { "startTime": "2026-03-29T19:00:00+02:00", "endTime": "2026-03-29T21:00:00+02:00", "average": 0.08737 },
  "cheapest3hWindow": { "startTime": "2026-03-29T18:00:00+02:00", "endTime": "2026-03-29T21:00:00+02:00", "average": 0.08843 },
  "cheapest4hWindow": { "startTime": "2026-03-29T18:00:00+02:00", "endTime": "2026-03-29T22:00:00+02:00", "average": 0.08938 },
  "rankedBy": "pvpc",
  "source": "Red Eléctrica (REData API) – PVPC and day-ahead market prices, peninsular system"
}
```

Every run also saves a free **SUMMARY** record in the key-value store with the average PVPC of the period, the cheapest and most expensive hour, and a short summary of each day.

## Pricing

You only pay for the rows you get (pay per result). A day is 24 hourly rows, or a single row with the daily output.

## FAQ

**Is this legal?** Yes. Red Eléctrica publishes these prices as open data through its public REData API, and every record includes the source.

**When are tomorrow's prices available?** The day-ahead market closes at noon and its prices appear around 13:00; Red Eléctrica publishes tomorrow's PVPC around 20:30 (Spanish time). Schedule a run at 21:00 to always get the full day.

**Which areas are covered?** The peninsular electricity system, as published by Red Eléctrica's REData API.

**Do the prices include taxes?** No. PVPC prices include energy, network tolls and charges, but not the electricity tax or VAT.

## Made by

The team behind [CuántoGasta](https://cuantogasta.github.io/), a free website with the price of electricity in Spain hour by hour, today and tomorrow.
