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
  const [activeTab, setActiveTab] = useState('CAM1');

  // Main.jsx 에서 가져온 차트 데이터
  const chartData = [
    { time: '10:00', CAM1: 30, CAM2: 60, CAM3: 15 },
    { time: '11:00', CAM1: 40, CAM2: 70, CAM3: 25 },
    { time: '12:00', CAM1: 60, CAM2: 80, CAM3: 20 },
    { time: '13:00', CAM1: 70, CAM2: 85, CAM3: 30 },
    { time: '14:00', CAM1: 60, CAM2: 75, CAM3: 20 },
  ];

  // 스크린샷 기반 기간별 통계 데이터
  const monthly = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 50 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 10 },
    { name: 'Jun', value: 80 },
    { name: 'Jul', value: 25 },
    { name: 'Aug', value: 70 },
    { name: 'Sep', value: 5 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 },
  ];
  const weekly = [
    { name: 'Week1', value: 30 },
    { name: 'Week2', value: 50 },
    { name: 'Week3', value: 10 },
    { name: 'Week4', value: 25 },
    { name: 'Week5', value: 70 },
  ];
  const daily = [
    { name: 'Day1', value: 5 },
    { name: 'Day2', value: 15 },
    { name: 'Day3', value: 30 },
    { name: 'Day4', value: 25 },
    { name: 'Day5', value: 80 },
  ];

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
        <div className={styles.pageHeader}>
          {collapsed && (
            <button className={styles.backButton} onClick={() => setCollapsed(false)}>
              <img src={backIcon} alt="Back" />
            </button>
          )}
          <h1 className={styles.title}>STATISTICS</h1>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        {/* Cam 탭 */}
        <div className={styles.tabs}>
          {['CAM1', 'CAM2', 'CAM3'].map(cam => (
            <button
              key={cam}
              className={`${styles.tab} ${activeTab === cam ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cam)}
            >
              {cam}
            </button>
          ))}
        </div>

        {/* Line Chart */}
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#B0B8C4" />
              <YAxis stroke="#B0B8C4" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={activeTab} stroke="#1FC295" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 기간별 데이터 박스 */}
        <div className={styles.dataBoxes}>
          <div className={styles.dataBox}>
            <h3>[Monthly]</h3>
            {monthly.map(item => (
              <div key={item.name} className={styles.dataItem}>
                {item.name}: {item.value}
              </div>
            ))}
          </div>
          <div className={styles.dataBox}>
            <h3>[Weekly]</h3>
            {weekly.map(item => (
              <div key={item.name} className={styles.dataItem}>
                {item.name}: {item.value}
              </div>
            ))}
          </div>
          <div className={styles.dataBox}>
            <h3>[Daily]</h3>
            {daily.map(item => (
              <div key={item.name} className={styles.dataItem}>
                {item.name}: {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
