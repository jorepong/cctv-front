# ENC-front

> Frontend project for the ENC (Emergency Notification & CCTV) system.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Page Composition](#page-composition)
3. [System Diagram](#system-diagram)
4. [Data Catalogue](#data-catalogue)

   * [Dash Board](#dash-board)
   * [Statistics](#statistics)
   * [Map](#map)
   * [Report](#report)
   * [CAM](#cam)

---

## Project Overview

The **ENC-front** project is the frontend of the Emergency Notification & CCTV system. It provides a unified interface to monitor CCTV feeds, statistical analyses, map locations, and external reports.

## Page Composition

Each page in the ENC-front application serves a different purpose:

* **Dash Board**: Summarizes all key information in one place.
* **Statistics**: Displays numerical and graphical statistical data.
* **Map**: Shows the locations of installed CCTVs on a map.
* **Report**: Aggregates and displays external incident reports.
* **CAM**: Streams live CCTV feeds.

## System Diagram

Below is the high-level system architecture for ENC-front:

![System Diagram](diagram.png)

> **diagram.png**: Illustrates data flow between frontend, backend, and data sources.

## Data Catalogue

This section lists all data entities consumed by each page.

### Dash Board

* **CCTV Screen Feed**

  * `cam_id`
  * `rtsp_url`

* **Density Processing Image**

  * `snapshot_id`
  * `created_at`

* **Congestion Indicators**

  * `snapshot_id`
  * `event_timestamp`
  * `person_count`
  * `congestion_value_raw`
  * `congestion_level`
  * `comparision_historicla_avg_count`
  * `created_at`

### Statistics

* `snapshot_id`
* `event_timestamp`
* `person_count`
* `congestion_value_raw`
* `congestion_level`
* `comparision_historicla_avg_count`
* `created_at`

### Map

![Map View](Map.png)

Displays camera installation points on a geographic map. Uses coordinates and metadata from backend.

### Report

* `report_id`
* `report_message`

Aggregates user-submitted incident reports for display and filtering.

### CAM

* `cam_id`
* `rtsp_url`

Streams raw RTSP feeds from each CCTV camera.

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourorg/ENC-front.git
   cd ENC-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open** `http://localhost:3000` in your browser.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
