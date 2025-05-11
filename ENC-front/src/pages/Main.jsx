// src/pages/Main.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Main.module.css';

// 이미지 경로는 실제 프로젝트 경로에 맞게 바꿔주세요
import cam1 from '../assets/react.svg';
import cam2 from '../assets/react.svg';
import cam3 from '../assets/react.svg';
import chart from '../assets/react.svg';
import mapImg from '../assets/react.svg';

function Main() {
  const cameras = [
    { img: cam1, name: 'CAM1' },
    { img: cam2, name: 'CAM2', attention: true },
    { img: cam3, name: 'CAM3' },
  ];

  const reports = [
    { id: 1, time: '2025.05.07 - 17:10' },
    { id: 2, time: '2025.05.07 - 14:37' },
    { id: 3, time: '2025.05.07 - 11:06' },
    { id: 4, time: '2025.05.07 - 08:19' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* --- Sidebar --- */}
      <nav className={styles.sidebar}>
        <div className={styles.logo}>DGU</div>
        <div className={styles.user}>
          <strong>Tester</strong>
          <span>admin</span>
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
              Dash Board
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className={({ isActive }) => isActive ? styles.active : ''}>
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className={({ isActive }) => isActive ? styles.active : ''}>
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/report" className={({ isActive }) => isActive ? styles.active : ''}>
              Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>
              CAM
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* --- Main Content --- */}
      <div className={styles.content}>
        <h1 className={styles.title}>DASH BOARD</h1>

        {/* Cameras */}
        <section className={styles.cameras}>
          {cameras.map(c => (
            <div key={c.name} className={styles.camBox}>
              <img src={c.img} alt={c.name} />
              {c.attention && <div className={styles.attention}>Attention</div>}
              <div className={styles.camLabel}>{c.name}</div>
            </div>
          ))}
        </section>

        {/* Statistics Row */}
        <section className={styles.statsRow}>
          {/* Line Chart */}
          <div className={styles.chartBox}>
            <img src={chart} alt="Statistics" />
            <div className={styles.chartLabel}>Statistics</div>
          </div>

          {/* Count Numbers */}
          <div className={styles.countBox}>
            <div className={styles.countTitle}>[Now / Max]</div>
            <div>CAM1: <strong>60</strong> / 100</div>
            <div>CAM2: <strong>80</strong> / 100</div>
            <div>CAM3: <strong>20</strong> / 100</div>
            <div className={styles.chartLabel}>Count Number</div>
          </div>

          {/* Donut Charts */}
          <div className={styles.donutBox}>
            <div className={styles.donut}>
              <div className={styles.circle} style={{ '--percent': '60deg' }} />
              <div className={styles.donutLabel}>CAM1</div>
            </div>
            <div className={styles.donut}>
              <div className={styles.circle} style={{ '--percent': '80deg' }} />
              <div className={styles.donutLabel}>CAM2</div>
            </div>
            <div className={styles.donut}>
              <div className={styles.circle} style={{ '--percent': '20deg' }} />
              <div className={styles.donutLabel}>CAM3</div>
            </div>
            <div className={styles.chartLabel}>Population Density</div>
          </div>
        </section>

        {/* Bottom Row: Map & Reports */}
        <section className={styles.bottomRow}>
          {/* Map */}
          <div className={styles.mapBox}>
            <img src={mapImg} alt="Map" />
            <div className={styles.chartLabel}>Map</div>
          </div>

          {/* Reports */}
          <div className={styles.reportBox}>
            <div className={styles.chartLabel}>Reports</div>
            <div className={styles.reports}>
              {reports.map(r => (
                <div key={r.id} className={styles.reportItem}>
                  <div className={styles.reportTitle}>
                    Report #{r.id}: {r.time}
                  </div>
                  <div className={styles.reportDesc}>anonymous people</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;