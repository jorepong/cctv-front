// src/components/Map.jsx
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Map.module.css';

// assets
import schoolLogo from '../assets/school_logo.png';
import mapImg from '../assets/LargeMap.png';
import homeGray from '../assets/home_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import mapPurple from '../assets/map_purple.png';
import reportGray from '../assets/report_gray.png';
import camGray from '../assets/cam_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';
import redPing from '../assets/redPing.png';
import greenPing from '../assets/greenPing.png';
import grayPing from '../assets/grayPing.png';

function Map() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeCam, setActiveCam] = useState(null);
  const blinkTimeout = useRef(null);

  const cams = [
    { id: 'CAM1', x: 25, y: 40, icon: redPing },
    { id: 'CAM2', x: 43, y: 43, icon: greenPing },
    { id: 'CAM3', x: 33, y: 69, icon: grayPing },
  ];

  const onSelectCam = (id) => {
    clearTimeout(blinkTimeout.current);
    setActiveCam(id);
    // 2초 후 자동 해제
    blinkTimeout.current = setTimeout(() => setActiveCam(null), 2000);
  };

  return (
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <button
          className={styles.hamburger}
          onClick={() => setCollapsed(!collapsed)}
        >
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
            <img src={mapPurple} alt="Map" className={styles.menuIcon} />
            <NavLink to="/map" className={({ isActive }) => isActive ? styles.active : ''}>
              Map
            </NavLink>
          </li>
          <li>
            <img src={reportGray} alt="Report" className={styles.menuIcon} />
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

      {/* Main Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.titleGroup}>
            {collapsed && (
              <button className={styles.backButton} onClick={() => setCollapsed(false)}>
                <img src={backIcon} alt="Back" />
              </button>
            )}
            <h1 className={styles.title}>Map</h1>
          </div>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        {/* Map Area */}
        <div className={styles.mapArea}>
          <div className={styles.mapWrapper}>
            <img src={mapImg} alt="Campus Map" />
            {cams.map(cam => (
                <img
                key={cam.id}
                src={cam.icon}
                alt={cam.id}
                className={`${styles.ping} ${activeCam === cam.id ? styles.blink : ''}`}
                style={{
                    left: `${cam.x}%`,
                    top: `${cam.y}%`,
                    width: cam.id === 'CAM3' ? '64px' : '48px',
                    height: cam.id === 'CAM3' ? '64px' : '48px',
                }}
                onClick={() => onSelectCam(cam.id)}
                />
            ))}
          </div>
          <div className={styles.legend}>
            {cams.map(cam => (
              <div
                key={cam.id}
                className={`
                  ${styles.legendItem}
                  ${activeCam === cam.id ? styles.blinkText : ''}
                  ${activeCam === cam.id ? styles.activeText : ''}
                `}
                onClick={() => onSelectCam(cam.id)}
              >
                <span
                  className={styles.marker}
                  style={{ backgroundImage: `url(${cam.icon})` }}
                />
                {cam.id}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
