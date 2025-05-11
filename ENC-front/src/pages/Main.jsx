import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Main.module.css';

// 이미지 경로
import schoolLogo from '../assets/school_logo.png';
import cam1 from '../assets/CAM1.png';
import cam2 from '../assets/CAM2.png';
import cam3 from '../assets/CAM3.png';
import chart from '../assets/react.svg';
import mapImg from '../assets/REAL-MAP.png';
import homePurple from '../assets/home_purple.png';
import mapGray from '../assets/map_gray.png';
import reportGray from '../assets/report_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

function Main() {
  // 사이드바 열림/닫힘 상태
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // 각 CAM별 현재 수치
  const statsData = [
    { name: 'CAM1', count: 60 },
    { name: 'CAM2', count: 80 },
    { name: 'CAM3', count: 20 },
  ];

  // 색상 결정 함수: count <50: 녹색, 50≤<80: 노랑, ≥80: 빨강
  const getColor = (count) => {
    if (count < 50) return '#1FC295';
    if (count < 80) return '#FFD54F';
    return '#E74C3C';
  };

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
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
      {/* --- Sidebar --- */}
      <nav className={styles.sidebar}>
        <button
          className={styles.hamburger}
          onClick={() => setCollapsed(true)}
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
            <img src={homePurple} alt="Home" className={styles.menuIcon} />
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
            <img src={mapGray} alt="CAM" className={styles.menuIcon} />
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>
              CAM
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* --- Main Content --- */}
      <div className={styles.content}>
        {/* 뒤로가기 + 페이지 타이틀 */}
        <div className={styles.pageHeader}>
          {collapsed && (
            <button
              className={styles.backButton}
              onClick={() => setCollapsed(false)}
              title="뒤로가기"
            >
              <img src={backIcon} alt="Back" />
            </button>
          )}
          <h1 className={styles.title}>DASH BOARD</h1>
        </div>

        {/* University Logo */}
        <div className={styles.header}>
          <img
            src={schoolLogo}
            alt="Dongguk University"
            className={styles.schoolLogo}
          />
        </div>

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

        {/* Main Area: Left(Stats+Map) / Right(Reports) */}
        <section className={styles.mainArea}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* 통계 카드 */}
            <div className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                {/* 1) Line Chart */}
                <div className={styles.chartBox}>
                  <img src={chart} alt="Statistics" />
                </div>

                {/* 2) Count Number */}
                <div className={styles.countBox}>
                  <div className={styles.countTitle}>[Now / Max]</div>
                  {statsData.map(s => (
                    <div key={s.name} className={styles.countItem}>
                      {s.name}:{' '}
                      <strong style={{ color: getColor(s.count) }}>
                        {s.count}
                      </strong>{' '}
                      / 100
                    </div>
                  ))}
                </div>

                {/* 3) Population Density (Donut Charts) */}
                <div className={styles.donutBox}>
                  {statsData.map(s => {
                    const percent = (s.count / 100) * 360;
                    const c = getColor(s.count);
                    return (
                      <div key={s.name} className={styles.donut}>
                        <div
                          className={styles.circle}
                          style={{
                            background: `conic-gradient(${c} ${percent}deg, #555 ${percent}deg)`
                          }}
                        />
                        <div className={styles.donutLabel}>{s.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* 레이블 행 */}
            <div className={styles.statsLabels}>
              <div>Statistics</div>
              <div>Count Number</div>
              <div>Population Density</div>
            </div>

            {/* Map */}
            <div className={styles.mapContainer}>
              <div className={styles.mapBox}>
                <img src={mapImg} alt="Map" />
              </div>
              <div className={styles.mapLabel}>Map</div>
            </div>
          </div>

          {/* Right Column: Reports */}
          <div className={styles.rightColumn}>
            <div className={styles.reportsContainer}>
              <div className={styles.reportsBox}>
                {reports.map(r => (
                  <div key={r.id} className={styles.reportItem}>
                    <div className={styles.reportTitle}>
                      Report #{r.id}: {r.time}
                    </div>
                    <div className={styles.reportDesc}>anonymous people</div>
                  </div>
                ))}
              </div>
              <div className={styles.reportsLabel}>Reports</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
