# ENC-front

ENC-front는 CCTV 모니터링 및 관제 시스템을 위한 프론트엔드 애플리케이션입니다. 대시보드, 통계, 지도, 신고 내역, 개별 CCTV 화면 등 다양한 기능을 통해 효율적인 관제를 지원합니다.

##  목차

- [📖 페이지 구성 (Page Configuration)](#-페이지-구성-page-configuration)
- [🏗️ 시스템 다이어그램 (System Diagram)](#️-시스템-다이어그램-system-diagram)
- [📊 사용하는 데이터 목록 (Data Used)](#-사용하는-데이터-목록-data-used)
  - [1. Dash Board](#1-dash-board)
  - [2. Statistics](#2-statistics)
  - [3. Map](#3-map)
  - [4. Report](#4-report)
  - [5. CAM](#5-cam)

## 📖 페이지 구성 (Page Configuration)

ENC-front는 다음과 같은 주요 페이지로 구성됩니다:

-   **Dash Board**: 전체 시스템의 핵심 정보를 요약하여 시각적으로 표기하는 페이지입니다. 실시간 CCTV 화면, 밀집도 처리 이미지, 혼잡도 현황 등을 한눈에 파악할 수 있습니다.
-   **Statistics**: 수집된 데이터를 기반으로 다양한 통계 정보를 그래프 및 차트 형태로 표기하는 페이지입니다. 시간별, 일별, 월별 혼잡도 추이 등을 분석할 수 있습니다.
-   **Map**: 지도 상에 등록된 CCTV의 설치 위치를 표기하는 페이지입니다. 각 CCTV 아이콘을 통해 상세 정보 확인 및 해당 CCTV 화면으로 이동이 가능합니다.
-   **Report**: 외부 시스템 또는 사용자를 통해 접수된 신고 내역을 통합하여 목록 형태로 보여주는 페이지입니다. 신고 내용, 발생 시각, 처리 상태 등을 관리할 수 있습니다.
-   **CAM**: 선택된 특정 CCTV의 실시간 영상 화면만을 전체 화면 또는 지정된 레이아웃으로 보여주는 페이지입니다. 집중 모니터링이 필요할 때 사용됩니다.

## 🏗️ 시스템 다이어그램 (System Diagram)

본 프로젝트의 전체 시스템 구성은 아래 다이어그램과 같습니다.

![System Diagram](diagram.png)

*(주의: `diagram.png` 파일이 프로젝트 루트 디렉토리에 위치해야 이미지가 올바르게 표시됩니다.)*

## 📊 사용하는 데이터 목록 (Data Used)

각 페이지에서 사용되는 주요 데이터 필드는 다음과 같습니다.

### 1. Dash Board

대시보드 페이지는 다음과 같은 데이터를 활용하여 정보를 표시합니다.

#### 📹 CCTV 화면 표출 (CCTV Live Feed)

-   `cam_id`: 카메라 고유 ID
-   `rtsp_url`: RTSP 스트리밍 URL

#### 🖼️ 밀집도 처리 이미지 (Density Processed Image)

-   `snapshot_id`: 스냅샷 고유 ID
-   `created_at`: 이미지 생성 시각

#### 🚦 혼잡도 표현 (Congestion Level Display)

-   `snapshot_id`: 스냅샷 고유 ID
-   `event_timestamp`: 이벤트 발생 시각 (데이터 기준 시각)
-   `person_count`: 감지된 인원 수
-   `congestion_value_raw`: 혼잡도 계산 원시 값
-   `congestion_level`: 혼잡도 단계 (예: 낮음, 보통, 높음, 매우 높음)
-   `comparison_historical_avg_count`: 과거 동일 시간대 평균 인원 수 대비 현재 인원 수 비교 값/비율
-   `created_at`: 해당 혼잡도 데이터 생성 시각

### 2. Statistics

통계 페이지는 주로 시간의 흐름에 따른 혼잡도 변화를 분석하기 위해 다음 데이터를 사용합니다.

-   `snapshot_id`: 스냅샷 고유 ID
-   `event_timestamp`: 이벤트 발생 시각 (데이터 기준 시각)
-   `person_count`: 감지된 인원 수
-   `congestion_value_raw`: 혼잡도 계산 원시 값
-   `congestion_level`: 혼잡도 단계
-   `comparison_historical_avg_count`: 과거 동일 시간대 평균 인원 수 대비 현재 인원 수 비교 값/비율
-   `created_at`: 해당 통계 데이터 생성 시각

### 3. Map

지도 페이지는 CCTV의 위치 정보를 시각화합니다. 실제 지도 표시에 사용되는 데이터는 다음과 같을 수 있으며, `Map.png`는 지도 화면의 예시 또는 배경으로 사용될 수 있습니다.

-   (CCTV 위치 데이터 예시 - 실제 필드는 API 명세에 따라 다를 수 있음)
    -   `cam_id`: 카메라 고유 ID
    -   `latitude`: 위도
    -   `longitude`: 경도
    -   `cam_name`: 카메라 명칭
    -   `status`: 카메라 상태

아래는 지도 페이지의 화면 예시입니다.
![Map Example](Map.png)

*(주의: `Map.png` 파일이 프로젝트 루트 디렉토리에 위치해야 이미지가 올바르게 표시됩니다.)*

### 4. Report

외부 신고 내역을 통합하여 보여주는 페이지입니다.

-   `report_id`: 신고 고유 ID
-   `report_message`: 신고 내용
-   `reporter_info`: 신고자 정보 (필요시)
-   `reported_at`: 신고 접수 시각
-   `status`: 신고 처리 상태 (예: 접수, 처리중, 완료)

### 5. CAM

개별 CCTV 화면을 보여주는 페이지입니다.

-   `cam_id`: 카메라 고유 ID
-   `rtsp_url`: RTSP 스트리밍 URL
-   `cam_name`: 카메라 명칭 (표시용)

---
