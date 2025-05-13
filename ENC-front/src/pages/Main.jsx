import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import styles from './Main.module.css';

import schoolLogo from '../assets/school_logo.png';
// import cam1 from '../assets/CAM1.png';
// import cam2 from '../assets/CAM2.png';
// import cam3 from '../assets/CAM3.png';
import mapImg from '../assets/REAL-MAP.png';
import homePurple from '../assets/home_purple.png';
import mapGray from '../assets/map_gray.png';
import reportGray from '../assets/report_gray.png';
import camGray from '../assets/cam_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

function CamPlayer({ url, attention }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }, [url]);

  return (
    <div className={styles.camBox}>
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className={styles.camVideo}
        style={{ width: '100%', height: 'auto' }}
      />
      {attention && <div className={styles.attention}>Attention</div>}
      <div className={styles.camLabel}>{url.split('/').slice(-2, -1)[0].toUpperCase()}</div>
    </div>
  );
}

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const statsData = [
    { name: 'CAM1', count: 60 },
    { name: 'CAM2', count: 80 },
    { name: 'CAM3', count: 20 },
  ];

  const chartData = [
    { time: '10:00', CAM1: 30, CAM2: 60, CAM3: 15 },
    { time: '11:00', CAM1: 40, CAM2: 70, CAM3: 25 },
    { time: '12:00', CAM1: 60, CAM2: 80, CAM3: 20 },
    { time: '13:00', CAM1: 70, CAM2: 85, CAM3: 30 },
    { time: '14:00', CAM1: 60, CAM2: 75, CAM3: 20 },
  ];

  const getColor = (count) => {
    if (count < 50) return '#1FC295';
    if (count < 80) return '#FFD54F';
    return '#E74C3C';
  };

  // HLS 스트림 URL 배열
  const cameras = [
    { url: 'http://localhost:8000/cam1/stream.m3u8', name: 'CAM1' },
    { url: 'http://localhost:8000/cam1/stream.m3u8', name: 'CAM2', attention: true },
    { url: 'http://localhost:8000/cam1/stream.m3u8', name: 'CAM3' },
  ];

  const reports = [
    { id: 1, time: '2025.05.07 - 17:10' },
    { id: 2, time: '2025.05.07 - 14:37' },
    { id: 3, time: '2025.05.07 - 11:06' },
    { id: 4, time: '2025.05.07 - 08:19' },
    { id: 5, time: '2025.05.07 - 08:19' },
    { id: 6, time: '2025.05.07 - 08:19' },
    { id: 7, time: '2025.05.07 - 08:19' },
    { id: 8, time: '2025.05.07 - 08:19' },
    { id: 9, time: '2025.05.07 - 08:19' },
    { id: 10, time: '2025.05.07 - 08:19'}
  ];

  return (
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
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
            <img src={homePurple} alt="Home" className={styles.menuIcon} />
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Dash Board</NavLink>
          </li>
          <li>
            <img src={statisticGray} alt="Statistics" className={styles.menuIcon} />
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

      <div className={styles.content}>
        <div className={styles.pageHeader}>
          {collapsed && (
            <button className={styles.backButton} onClick={() => setCollapsed(false)}>
              <img src={backIcon} alt="Back" />
            </button>
          )}
          <h1 className={styles.title}>DASH BOARD</h1>
        </div>

        <div className={styles.header}>
          <img src={schoolLogo} alt="Dongguk University" className={styles.schoolLogo} />
        </div>

        <section className={styles.cameras}>
          {cameras.map(cam => (
            <CamPlayer key={cam.name} url={cam.url} attention={cam.attention} />
          ))}
        </section>

        <section className={styles.mainArea}>
          <div className={styles.leftColumn}>
            <div className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                <div className={styles.chartBox}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }}  tickLine={{ strokeWidth: 2 }}/>
                      <YAxis stroke="#B0B8C4" axisLine={{ strokeWidth: 2 }}  tickLine={{ strokeWidth: 2 }}/>
                      <Tooltip />
                      <Line type="monotone" dataKey="CAM1" stroke="#1FC295" strokeWidth={3}/>
                      <Line type="monotone" dataKey="CAM2" stroke="#FFD54F" strokeWidth={3}/>
                      <Line type="monotone" dataKey="CAM3" stroke="#E74C3C" strokeWidth={3}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>

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

            <div className={styles.statsLabels}>
              <div>Statistics</div>
              <div>Count Number</div>
              <div>Population Density</div>
            </div>

            <div className={styles.mapContainer}>
              <div className={styles.mapBox}>
                <img src={mapImg} alt="Map" />
              </div>
              <div className={styles.mapLabel}>Map</div>
            </div>
          </div>

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
