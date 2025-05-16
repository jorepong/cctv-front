// src/components/Main.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import styles from './Main.module.css';

import schoolLogo from '../assets/school_logo.png';
import mapImg from '../assets/REAL-MAP.png';
import homePurple from '../assets/home_purple.png';
import mapGray from '../assets/map_gray.png';
import reportGray from '../assets/report_gray.png';
import camGray from '../assets/cam_gray.png';
import statisticGray from '../assets/statistic_gray.png';
import hamburgerIcon from '../assets/hamburgerIcon.png';
import backIcon from '../assets/backIcon.png';

import cam1Cap from '../assets/CAM1src.jpg';
import cam2Cap from '../assets/CAM2src.jpg';
import cam3Cap from '../assets/CAM3src.png';

function CamPlayer({ url, attention, name, captureSrc, density }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      return () => { hls.destroy(); };
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
        className={`${styles.camVideo} ${attention ? styles.attentionVideo : ''}`}
      />
      {attention && <div className={styles.attention}>Attention</div>}
      <div className={styles.camLabel}>{name}</div>
      <div className={styles.captureBox}>
        <img src={captureSrc} alt={`${name} capture`} className={styles.captureImg} />
        <div className={styles.densityLabel}>{name}'s density</div>
      </div>
    </div>
  );
}

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // === Stats Data ===
  const [statsData, setStatsData] = useState([
    { name: 'CAM1', count: 60 },
    { name: 'CAM2', count: 80 },
    { name: 'CAM3', count: 20 },
  ]);

  // // Uncomment when API is ready:
  /*  useEffect(() => {
      // 최신 혼잡도 전체 조회
      fetch('/congestion/latest/')
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // data가 배열인 경우
          const mapped = Array.isArray(data)
            ? data.map(item => ({
                name: CAM${item.camera_id},
                count: item.person_count,
              }))
            : // camera_id 쿼리 파라 없애고 단일 객체 리턴 시
              [{
                name: CAM${item.camera_id},
                count: data.person_count,
              }];

          setStatsData(mapped);
        })
        .catch(err => {
          console.error('Failed to fetch congestion data:', err);
        });
    }, []);
  */

  // === Chart Data ===
  const [chartData, setChartData] = useState([
    { time: '10:00', CAM1: 30, CAM2: 60, CAM3: 15 },
    { time: '11:00', CAM1: 40, CAM2: 70, CAM3: 25 },
    { time: '12:00', CAM1: 60, CAM2: 80, CAM3: 20 },
    { time: '13:00', CAM1: 70, CAM2: 85, CAM3: 30 },
    { time: '14:00', CAM1: 60, CAM2: 75, CAM3: 20 },
  ]);

  // // Uncomment when API is ready:
  /*  useEffect(() => {
      const cameraIds = [1, 2, 3];           // 원하는 카메라 ID 리스트
      const dateRange = 'today';            // 예: today, last_7_days 등
      const groupBy = 'hour_of_day';        // 시간별 그룹화
      
      // 각 카메라별 통계 가져오기
      Promise.all(
        cameraIds.map(id =>
          fetch(`/congestion/statistics/?camera_id=${id}&date_range=${dateRange}&group_by=${groupBy}`)
            .then(res => {
              if (!res.ok) throw new Error(`Camera ${id} failed: ${res.status}`);
              return res.json();
            })
            .then(json => ({
              cameraId: id,
              stats: json.statistics,  // [{ hour: X, avg_person_count: Y, … }, …]
            }))
        )
      )
        .then(results => {
          // 모든 카메라에서 등장한 시간(hour) 값 수집
          const allHours = new Set();
          results.forEach(({ stats }) =>
            stats.forEach(({ hour }) => allHours.add(hour))
          );
          const sortedHours = Array.from(allHours).sort((a, b) => a - b);

          // 시간별로 CAM1, CAM2… 필드를 가진 객체 생성
          const merged = sortedHours.map(hour => {
            const entry = { time: `${hour}:00` };
            results.forEach(({ cameraId, stats }) => {
              const rec = stats.find(s => s.hour === hour);
              entry[`CAM${cameraId}`] = rec ? rec.avg_person_count : 0;
            });
            return entry;
          });

          setChartData(merged);
        })
        .catch(err => {
          console.error('Failed to fetch statistics:', err);
        });
    }, []); // 빈 배열: 컴포넌트 마운트 시 한 번 실행

  */

  // === Cameras Config ===
  const [cameras, setCameras] = useState([
    {
      url: 'http://34.64.193.136/stream1.m3u8',
      name: 'CAM1',
      attention: false,
      captureSrc: cam1Cap, // 하드코딩된 캡처 이미지
      density: '60%',
    },
    {
      url: 'http://localhost:8000/cam2/stream.m3u8',
      name: 'CAM2',
      attention: true,
      captureSrc: cam2Cap, // 하드코딩된 캡처 이미지
      density: '80%',
    },
    {
      url: 'http://localhost:8000/cam3/stream.m3u8',
      name: 'CAM3',
      attention: false,
      captureSrc: cam3Cap, // 하드코딩된 캡처 이미지
      density: '20%',
    },
  ]);
  // // Uncomment when API is ready: ****여기 나중에 4. AI 분석 완료된 스냅샷 이미지 조회 **** 부분에서 찾아서 추가해야 함!!
  // useEffect(() => {
  //   fetch('/api/cameras')
  //     .then(res => res.json())
  //     .then(data => {
  //       // data는 [{ url, name, attention, captureSrc, density }, …] 형태여야 합니다.
  //       setCameras(data);
  //     })
  //     .catch(err => console.error('Failed to load cameras:', err));
  // }, []);

  // === Reports List ===
  const [reports, setReports] = useState([
    { id: 1, time: '2025.05.07 - 17:10' },
    { id: 2, time: '2025.05.07 - 14:37' },
    { id: 3, time: '2025.05.07 - 11:06' },
    { id: 4, time: '2025.05.07 - 11:06' },
    { id: 5, time: '2025.05.07 - 11:06' },
    { id: 6, time: '2025.05.07 - 11:06' },
    { id: 7, time: '2025.05.07 - 11:06' },
    { id: 8, time: '2025.05.07 - 11:06' },
    { id: 9, time: '2025.05.07 - 11:06' },
    { id: 10, time: '2025.05.07 - 11:06' },
  ]);
  // // Uncomment when API is ready:
  /*  useEffect(() => {
      const status    = 'all';    // 조회할 상태 (active/acknowledged/all)
      const cameraId  = null;     // 특정 카메라만 보고 싶으면 ID, 아니면 null
      const limit     = 20;       // 한 번에 불러올 개수
      const page      = 1;        // 페이지 번호

      // URL에 camera_id 파라를 조건부로 붙이고 싶으면:
      const params = new URLSearchParams({
        status,
        limit: limit.toString(),
        page:  page.toString(),
        ...(cameraId !== null ? { camera_id: cameraId.toString() } : {})
      });

      fetch(`/alerts/?${params.toString()}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          // data.alerts 배열을 { id, time } 형태로 매핑
          const mapped = data.alerts.map(item => {
            const dt = new Date(item.event_timestamp);
            const pad = n => n.toString().padStart(2, '0');
            const formatted = 
              `${dt.getFullYear()}.${pad(dt.getMonth()+1)}.${pad(dt.getDate())}` +
              ` - ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;

            return {
              id:   item.alert_id,
              time: formatted,
            };
          });
          setReports(mapped);
        })
        .catch(err => {
          console.error('Failed to fetch alerts:', err);
        });
    }, []); // 빈 배열: 마운트 시 한 번 실행
  */

  const getColor = (count) => {
    if (count < 50) return '#1FC295';
    if (count < 80) return '#FFD54F';
    return '#E74C3C';
  };

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
            <img src={camGray} alt="CAM" className={styles.menuIcon} />
            <NavLink to="/cam" className={({ isActive }) => isActive ? styles.active : ''}>
              CAM
            </NavLink>
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
            <CamPlayer
              key={cam.name}
              url={cam.url}
              attention={cam.attention}
              name={cam.name}
              captureSrc={cam.captureSrc}
              density={cam.density}
            />
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
                      <XAxis
                        dataKey="time"
                        stroke="#B0B8C4"
                        axisLine={{ strokeWidth: 2 }}
                        tickLine={{ strokeWidth: 2 }}
                      />
                      <YAxis
                        stroke="#B0B8C4"
                        axisLine={{ strokeWidth: 2 }}
                        tickLine={{ strokeWidth: 2 }}
                      />
                      <Tooltip />
                      <Line type="monotone" dataKey="CAM1" stroke="#1FC295" strokeWidth={3} />
                      <Line type="monotone" dataKey="CAM2" stroke="#FFD54F" strokeWidth={3} />
                      <Line type="monotone" dataKey="CAM3" stroke="#E74C3C" strokeWidth={3} />
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
