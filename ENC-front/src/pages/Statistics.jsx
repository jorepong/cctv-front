// src/pages/Statistics.jsx
import React, { useState } from 'react';
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
  const dailyTodayData = {
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
  };
  const dailyYesterdayData = {
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
  };
  const dailyData = dailyTodayData[activeCam].map(d => ({
    time: d.time,
    current: d.value,
    previous: dailyYesterdayData[activeCam].find(y => y.time === d.time).value
  }));

  // ─── 2) Weekly: This Week vs Last Week ───────────────────────────────────────────
  const weeklyThisData = {
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
  };
  const weeklyLastData = {
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
  };
  const weeklyData = weeklyThisData[activeCam].map(d => ({
    day: d.day,
    current: d.value,
    previous: weeklyLastData[activeCam].find(y => y.day === d.day).value
  }));

  // ─── 3) Monthly: This Month vs Last Month ────────────────────────────────────────
  const monthlyThisData = {
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
  };
  const monthlyLastData = {
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
  };
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

        {/* CAM 탭 */}
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

        {/* 비교 차트 3개 */}
        <div className={styles.multiCharts}>
          {/* Daily */}
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Daily</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }}  tickLine={{ strokeWidth: 2 }}  />
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }}/>
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
                <XAxis dataKey="day" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }}  tickLine={{ strokeWidth: 2 }}/>
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }}/>
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="current" name="This Week" stroke="#FC0101" dot strokeWidth={3}/>
                <Line type="monotone" dataKey="previous" name="Last Week" stroke="#F9F903" dot strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly */}
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Monthly</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }}  tickLine={{ strokeWidth: 2 }}/>
                <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }} tickLine={{ strokeWidth: 2 }}/>
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" />
                <Line type="monotone" dataKey="current" name="This Month" stroke="#FC0101" dot strokeWidth={3}/>
                <Line type="monotone" dataKey="previous" name="Last Month" stroke="#F9F903" dot strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
