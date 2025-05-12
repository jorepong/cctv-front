// src/components/Cam.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Cam.module.css';

import schoolLogo from '../assets/school_logo.png';
import homeGray from '../assets/home_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import mapGray from '../assets/map_gray.png';
import reportGray from '../assets/report_gray.png';
import camPurple from '../assets/cam_purple.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

// CCTV 이미지
import cam1Img from '../assets/CAM1.png';
import cam2Img from '../assets/CAM2.png';
import cam3Img from '../assets/CAM3.png';

function Cam() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('CAM1');

  // 각 카메라 정보
  const cams = [
    { id: 'CAM1', src: cam1Img, attention: true },
    { id: 'CAM2', src: cam2Img, attention: false },
    { id: 'CAM3', src: cam3Img, attention: false },
  ];

  const currentCam = cams.find(c => c.id === selected) || cams[0];

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
            <img src={reportGray} alt="Report" className={styles.menuIcon} />
            <NavLink to="/report" className={({ isActive }) => isActive ? styles.active : ''}>
              Report
            </NavLink>
          </li>
          <li>
            <img src={camPurple} alt="CAM" className={styles.menuIcon} />
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>
              CAM
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.titleGroup}>
            {collapsed && (
              <button className={styles.backButton} onClick={() => setCollapsed(false)}>
                <img src={backIcon} alt="Back" />
              </button>
            )}
            <h1 className={styles.title}>CAM</h1>
          </div>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        {/* CAM 뷰어 */}
        <div className={styles.camContainer}>
          {/* 큰 화면 */}
          <div className={styles.camBox} onClick={() => {}}>
            <img
              src={currentCam.src}
              alt={currentCam.id}
              className={`${styles.camImage} ${currentCam.attention ? styles.attentionImage : ''}`}
            />
            {currentCam.attention && (
              <div className={styles.attentionBadge}>Attention</div>
            )}
            <div className={styles.camLabelBig}>{currentCam.id}</div>
          </div>

          {/* 작은 화면들 */}
          <div className={styles.smallCams}>
            {cams.filter(c => c.id !== selected).map(cam => (
              <div
                key={cam.id}
                className={styles.camBoxSmall}
                onClick={() => setSelected(cam.id)}
              >
                <img
                  src={cam.src}
                  alt={cam.id}
                  className={`${styles.camImageSmall} ${cam.attention ? styles.attentionImageSmall : ''}`}
                />
                {cam.attention && (
                  <div className={styles.attentionBadgeSmall}>Attention</div>
                )}
                <div className={styles.camLabelSmall}>{cam.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cam;
