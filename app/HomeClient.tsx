"use client";

import { useState } from 'react';
import styles from './page.module.css';

type Film = {
  id: number;
  title: string;
  year: number;
  poster: string;
  avgRating: number;
};

type ActivityItem = {
  id: number;
  user: string;
  action: string;
  film: string;
  score: number | null;
};

export default function HomeClient({
  trendingFilms,
  followingActivity,
}: {
  trendingFilms: Film[];
  followingActivity: ActivityItem[];
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`${styles.pageWrap} ${theme === 'light' ? styles.light : styles.dark}`}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.logo}>🦄 Unicorn Films</h1>
          <nav className={styles.nav}>
            <a href="/lists">Lists</a>
            <a href="/news">News</a>
            <a href="/awards/2026">Awards</a>
            <button
              className={styles.themeToggle}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </header>

        <section className={styles.section}>
          <h2>Trending Films</h2>
          <div className={styles.filmGrid}>
            {trendingFilms.map((film) => (
              <div key={film.id} className={styles.filmCard}>
                <div className={styles.posterWrap}>
                  <img src={film.poster} alt={film.title} className={styles.poster} />
                  {film.avgRating >= 4.5 && <span className={styles.badge}>🦄 Unicorn'd</span>}
                </div>
                <p className={styles.filmTitle}>{film.title} ({film.year})</p>
                <p className={styles.rating}>★ {film.avgRating.toFixed(1)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>From People You Follow</h2>
          <div className={styles.activityList}>
            {followingActivity.map((item) => (
              <div key={item.id} className={styles.activityItem}>
                <strong>{item.user}</strong>{" "}
                {item.action} <em>{item.film}</em>
                {item.score && <span className={styles.rating}> — ★ {item.score}</span>}
              </div>
            ))}
          </div>
        </section>

        <footer style={{ textAlign: 'center', fontSize: '11px', opacity: 0.5, marginTop: '40px', paddingBottom: '20px' }}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </footer>
      </main>
    </div>
  );
}
