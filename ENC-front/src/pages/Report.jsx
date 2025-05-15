// src/components/Report.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Report.module.css';

import schoolLogo from '../assets/school_logo.png';
import homeGray from '../assets/home_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import mapGray from '../assets/map_gray.png';
import reportPurple from '../assets/report_purple.png';
import camGray from '../assets/cam_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

function Report() {
  const [collapsed, setCollapsed] = useState(false);

  // === Reports Data ===
  const [reports, setReports] = useState([
    { id: 1, timestamp: '2025.05.07 - 17:10', desc: 'anonymous people sent report' },
    { id: 2, timestamp: '2025.05.07 - 14:37', desc: 'anonymous people sent report' },
    { id: 3, timestamp: '2025.05.07 - 11:06', desc: 'anonymous people sent report' },
    { id: 4, timestamp: '2025.05.07 - 08:19', desc: 'anonymous people sent report' },
    { id: 5, timestamp: '2025.05.07 - 05:02', desc: 'anonymous people sent report' },
    { id: 6, timestamp: '2025.05.06 - 19:41', desc: 'anonymous people sent report' },
    { id: 7, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' },
    { id: 8, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' },
    { id: 9, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' },
    { id: 10, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' },
    { id: 11, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' },
    { id: 12, timestamp: '2025.05.06 - 15:17', desc: 'anonymous people sent report' }
  ]);
  // // Uncomment when API is ready:
  // useEffect(() => {
  //   fetch('/api/reports')
  //     .then(res => res.json())
  //     .then(data => setReports(data))
  //     .catch(err => console.error('Failed to load reports:', err));
  // }, []);

  return (
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <button className={styles.hamburger} onClick={() => setCollapsed(!collapsed)}>
          <img src={hamburgerIcon} alt="Toggle menu" />
        </button>
        <div className={styles.logo}>DGU</div>
        <div className={styles.user}>
          <strong>Tester</strong>
          <span>admin</span>
        </div>
        <ul className={styles.menu}>
          <li>
            <img src={homeGray} alt="Dash Board" className={styles.menuIcon} />
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
              Dash Board
            </NavLink>
          </li>
          <li>
            <img src={statisticGray} alt="Statistics" className={styles.menuIcon} />
            <NavLink to="/statistics" className={({ isActive }) => isActive ? styles.active : ''}>
              Statistics
            </NavLink>
          </li>
          <li>
            <img src={mapGray} alt="Map" className={styles.menuIcon} />
            <NavLink to="/map" className={({ isActive }) => isActive ? styles.active : ''}>
              Map
            </NavLink>
          </li>
          <li>
            <img src={reportPurple} alt="Report" className={styles.menuIcon} />
            <NavLink to="/report" className={({ isActive }) => isActive ? styles.active : ''}>
              Report
            </NavLink>
          </li>
          <li>
            <img src={camGray} alt="CAM" className={styles.menuIcon} />
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>
              CAM
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {/* Header: back button, title, logo */}
        <div className={styles.pageHeader}>
          <div className={styles.titleGroup}>
            {collapsed && (
              <button className={styles.backButton} onClick={() => setCollapsed(false)}>
                <img src={backIcon} alt="Back" />
              </button>
            )}
            <h1 className={styles.title}>Reports</h1>
          </div>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        {/* Report list */}
        <div className={styles.reportsContainer}>
          <div className={styles.reportsBox}>
            {reports.map(report => (
              <div key={report.id} className={styles.reportItem}>
                <div className={styles.reportTitle}>
                  Report #{report.id}: {report.timestamp}
                </div>
                <div className={styles.reportDesc}>
                  {report.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
