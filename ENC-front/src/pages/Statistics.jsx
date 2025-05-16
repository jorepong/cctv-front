// src/pages/Statistics.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import styles from './Statistics.module.css';

import schoolLogo from '../assets/school_logo.png';
import statisticPurple from '../assets/statistic_purple.png';
import homeGray from '../assets/home_gray.png';
import mapGray from '../assets/map_gray.png';
import reportGray from '../assets/report_gray.png';
import camGray from '../assets/cam_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

function Statistics() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeCam, setActiveCam] = useState('CAM1');

  // ─── 1) Daily: Today vs Yesterday ─────────────────────────────────────────────
  const [dailyTodayData, setDailyTodayData] = useState({
    CAM1: [
      { time: '10:00', value: 30 },
      { time: '11:00', value: 40 },
      { time: '12:00', value: 60 },
      { time: '13:00', value: 70 },
      { time: '14:00', value: 60 },
    ],
    CAM2: [
      { time: '10:00', value: 25 },
      { time: '11:00', value: 35 },
      { time: '12:00', value: 55 },
      { time: '13:00', value: 65 },
      { time: '14:00', value: 50 },
    ],
    CAM3: [
      { time: '10:00', value: 20 },
      { time: '11:00', value: 30 },
      { time: '12:00', value: 50 },
      { time: '13:00', value: 60 },
      { time: '14:00', value: 45 },
    ],
  });

  // // Uncomment when API is ready:
  /*  useEffect(() => {
      const cameraIds = [1, 2, 3];           // 사용할 카메라 ID 목록
      const dateRange = 'today';            // 고정: 오늘
      const groupBy   = 'hour_of_day';      // 시간별 그룹화

      Promise.all(
        cameraIds.map(id =>
          fetch(`/congestion/statistics/?camera_id=${id}&date_range=${dateRange}&group_by=${groupBy}`)
            .then(res => {
              if (!res.ok) throw new Error(`Camera ${id} fetch failed (${res.status})`);
              return res.json();
            })
            .then(json => ({
              cameraId: id,
              stats: json.statistics,  // [{ hour: X, avg_person_count: Y, … }, …]
            }))
        )
      )
      .then(results => {
        // 결과를 { CAM1: [...], CAM2: [...], CAM3: [...] } 형태로 정리
        const mappedData = results.reduce((acc, { cameraId, stats }) => {
          const key = `CAM${cameraId}`;
          acc[key] = stats.map(({ hour, avg_person_count }) => {
            // 시간 포맷팅: 9 → "09:00", 14 → "14:00"
            const hh = hour.toString().padStart(2, '0');
            return { time: `${hh}:00`, value: avg_person_count };
          });
          return acc;
        }, {});

        setDailyTodayData(mappedData);
      })
      .catch(err => {
        console.error('Failed to fetch today’s congestion stats:', err);
      });
    }, []); // 마운트 시 한 번 실행 */

  const [dailyYesterdayData, setDailyYesterdayData] = useState({
    CAM1: [
      { time: '10:00', value: 25 },
      { time: '11:00', value: 35 },
      { time: '12:00', value: 50 },
      { time: '13:00', value: 65 },
      { time: '14:00', value: 55 },
    ],
    CAM2: [
      { time: '10:00', value: 20 },
      { time: '11:00', value: 30 },
      { time: '12:00', value: 45 },
      { time: '13:00', value: 60 },
      { time: '14:00', value: 48 },
    ],
    CAM3: [
      { time: '10:00', value: 15 },
      { time: '11:00', value: 28 },
      { time: '12:00', value: 40 },
      { time: '13:00', value: 55 },
      { time: '14:00', value: 42 },
    ],
  });
  // // Uncomment when API is ready:
  /*  useEffect(() => {
      // 1. 어제 날짜 계산
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const pad = n => n.toString().padStart(2, '0');
      const yyyy = yesterday.getFullYear();
      const mm = pad(yesterday.getMonth() + 1);
      const dd = pad(yesterday.getDate());
      const dateStr = `${yyyy}-${mm}-${dd}`;                    // "2025-05-15" 같은 형태
      const dateRange = `${dateStr}:${dateStr}`;                // "2025-05-15:2025-05-15"

      // 2. 카메라 ID 및 그룹화 기준 설정
      const cameraIds = [1, 2, 3];
      const groupBy = 'hour_of_day';

      // 3. 병렬로 API 호출
      Promise.all(
        cameraIds.map(id =>
          fetch(
            `/congestion/statistics/` +
            `?camera_id=${id}` +
            `&date_range=${dateRange}` +
            `&group_by=${groupBy}`
          )
            .then(res => {
              if (!res.ok) throw new Error(`Camera ${id} fetch failed (${res.status})`);
              return res.json();
            })
            .then(json => ({
              cameraId: id,
              stats: json.statistics,  // [{ hour, avg_person_count, … }, …]
            }))
        )
      )
      .then(results => {
        // 4. 결과를 { CAM1: [...], CAM2: [...], CAM3: [...] } 형태로 매핑
        const mapped = results.reduce((acc, { cameraId, stats }) => {
          const key = `CAM${cameraId}`;
          acc[key] = stats.map(({ hour, avg_person_count }) => {
            const hh = hour.toString().padStart(2, '0');
            return { time: `${hh}:00`, value: avg_person_count };
          });
          return acc;
        }, {});
        
        // 5. 상태 업데이트
        setDailyYesterdayData(mapped);
      })
      .catch(err => {
        console.error('Failed to fetch yesterday’s congestion stats:', err);
      });
    }, []);  // 컴포넌트 마운트 시 한 번만 실행
  */

  const dailyData = dailyTodayData[activeCam].map(d => ({
    time: d.time,
    current: d.value,
    previous: dailyYesterdayData[activeCam].find(y => y.time === d.time).value
  }));

  // ─── 2) Weekly: This Week vs Last Week ───────────────────────────────────────────
  const [weeklyThisData, setWeeklyThisData] = useState({
    CAM1: [
      { day: 'Mon', value: 30 },
      { day: 'Tue', value: 50 },
      { day: 'Wed', value: 10 },
      { day: 'Thu', value: 25 },
      { day: 'Fri', value: 70 },
      { day: 'Sat', value: 60 },
      { day: 'Sun', value: 45 },
    ],
    CAM2: [
      { day: 'Mon', value: 25 },
      { day: 'Tue', value: 45 },
      { day: 'Wed', value: 20 },
      { day: 'Thu', value: 30 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 55 },
      { day: 'Sun', value: 40 },
    ],
    CAM3: [
      { day: 'Mon', value: 20 },
      { day: 'Tue', value: 40 },
      { day: 'Wed', value: 15 },
      { day: 'Thu', value: 28 },
      { day: 'Fri', value: 60 },
      { day: 'Sat', value: 50 },
      { day: 'Sun', value: 35 },
    ],
  });
  // // Uncomment when API is ready:
  // useEffect(() => {
  //   fetch('/api/weekly/this')
  //     .then(res => res.json())
  //     .then(data => setWeeklyThisData(data))
  //     .catch(err => console.error('Failed to load weekly this-week data:', err));
  // }, []);

  const [weeklyLastData, setWeeklyLastData] = useState({
    CAM1: [
      { day: 'Mon', value: 20 },
      { day: 'Tue', value: 40 },
      { day: 'Wed', value: 15 },
      { day: 'Thu', value: 30 },
      { day: 'Fri', value: 55 },
      { day: 'Sat', value: 50 },
      { day: 'Sun', value: 35 },
    ],
    CAM2: [
      { day: 'Mon', value: 18 },
      { day: 'Tue', value: 38 },
      { day: 'Wed', value: 12 },
      { day: 'Thu', value: 28 },
      { day: 'Fri', value: 50 },
      { day: 'Sat', value: 45 },
      { day: 'Sun', value: 30 },
    ],
    CAM3: [
      { day: 'Mon', value: 15 },
      { day: 'Tue', value: 35 },
      { day: 'Wed', value: 10 },
      { day: 'Thu', value: 25 },
      { day: 'Fri', value: 48 },
      { day: 'Sat', value: 42 },
      { day: 'Sun', value: 28 },
    ],
  });
  // // Uncomment when API is ready:
  // useEffect(() => {
  //   fetch('/api/weekly/last')
  //     .then(res => res.json())
  //     .then(data => setWeeklyLastData(data))
  //     .catch(err => console.error('Failed to load weekly last-week data:', err));
  // }, []);

  const weeklyData = weeklyThisData[activeCam].map(d => ({
    day: d.day,
    current: d.value,
    previous: weeklyLastData[activeCam].find(y => y.day === d.day).value
  }));

  // ─── 3) Monthly: This Month vs Last Month ────────────────────────────────────────
  const [monthlyThisData, setMonthlyThisData] = useState({
    CAM1: [
      { week: 'Week1', value: 80 },
      { week: 'Week2', value: 95 },
      { week: 'Week3', value: 70 },
      { week: 'Week4', value: 100 },
    ],
    CAM2: [
      { week: 'Week1', value: 75 },
      { week: 'Week2', value: 90 },
      { week: 'Week3', value: 65 },
      { week: 'Week4', value: 95 },
    ],
    CAM3: [
      { week: 'Week1', value: 70 },
      { week: 'Week2', value: 85 },
      { week: 'Week3', value: 60 },
      { week: 'Week4', value: 90 },
    ],
  });
  // // Uncomment when API is ready:
  // useEffect(() => {
  //   fetch('/api/monthly/this')
  //     .then(res => res.json())
  //     .then(data => setMonthlyThisData(data))
  //     .catch(err => console.error('Failed to load monthly this-month data:', err));
  // }, []);

  const [monthlyLastData, setMonthlyLastData] = useState({
    CAM1: [
      { week: 'Week1', value: 60 },
      { week: 'Week2', value: 85 },
      { week: 'Week3', value: 50 },
      { week: 'Week4', value: 90 },
    ],
    CAM2: [
      { week: 'Week1', value: 55 },
      { week: 'Week2', value: 80 },
      { week: 'Week3', value: 45 },
      { week: 'Week4', value: 85 },
    ],
    CAM3: [
      { week: 'Week1', value: 50 },
      { week: 'Week2', value: 75 },
      { week: 'Week3', value: 40 },
      { week: 'Week4', value: 80 },
    ],
  });
  // // Uncomment when API is ready:
  // useEffect(() => {
  //   fetch('/api/monthly/last')
  //     .then(res => res.json())
  //     .then(data => setMonthlyLastData(data))
  //     .catch(err => console.error('Failed to load monthly last-month data:', err));
  // }, []);

  const monthlyData = monthlyThisData[activeCam].map(d => ({
    week: d.week,
    current: d.value,
    previous: monthlyLastData[activeCam].find(y => y.week === d.week).value
  }));

  return (
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <button className={styles.hamburger} onClick={() => setCollapsed(true)}>
          <img src={hamburgerIcon} alt="Toggle menu" />
        </button>
        <div className={styles.logo}>DGU</div>
        <div className={styles.user}>
          <strong>Tester</strong>
          <span>admin</span>
        </div>
        <ul className={styles.menu}>
          <li>
            <img src={homeGray} alt="Home" className={styles.menuIcon} />
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Dash Board</NavLink>
          </li>
          <li>
            <img src={statisticPurple} alt="Statistics" className={styles.menuIcon} />
            <NavLink to="/statistics" className={({ isActive }) => isActive ? styles.active : ''}>Statistics</NavLink>
          </li>
          <li>
            <img src={mapGray} alt="Map" className={styles.menuIcon} />
            <NavLink to="/map" className={({ isActive }) => isActive ? styles.active : ''}>Map</NavLink>
          </li>
          <li>
            <img src={reportGray} alt="Report" className={styles.menuIcon} />
            <NavLink to="/report" className={({ isActive }) => isActive ? styles.active : ''}>Report</NavLink>
          </li>
          <li>
            <img src={camGray} alt="CAM" className={styles.menuIcon} />
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>CAM</NavLink>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          {collapsed && (
            <button className={styles.backButton} onClick={() => setCollapsed(false)}>
              <img src={backIcon} alt="Back" />
            </button>
          )}
          <h1 className={styles.title}>STATISTICS</h1>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        {/* CAM tabs */}
        <div className={styles.tabs}>
          {['CAM1', 'CAM2', 'CAM3'].map(cam => (
            <button
              key={cam}
              className={`${styles.tab} ${activeCam === cam ? styles.activeTab : ''}`}
              onClick={() => setActiveCam(cam)}
            >
              {cam}
            </button>
          ))}
        </div>

        {/* Comparison charts */}
        <div className={styles.multiCharts}>
          {/* Daily */}
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Daily</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="current" name="Today" stroke="#FC0101" dot strokeWidth={3} />
                <Line type="monotone" dataKey="previous" name="Yesterday" stroke="#F9F903" dot strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly */}
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Weekly</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="current" name="This Week" stroke="#FC0101" dot strokeWidth={3} />
                <Line type="monotone" dataKey="previous" name="Last Week" stroke="#F9F903" dot strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly */}
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Monthly</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="current" name="This Month" stroke="#FC0101" dot strokeWidth={3} />
                <Line type="monotone" dataKey="previous" name="Last Month" stroke="#F9F903" dot strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
