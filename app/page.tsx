import { getTrendingFilms } from '../lib/tmdb';
import HomeClient from './HomeClient';

const followingActivity = [
  { id: 1, user: "chidinma_a", action: "rated", film: "Sherlock Holmes", score: 5 },
  { id: 2, user: "kunle_reviews", action: "reviewed", film: "Inception", score: null },
  { id: 3, user: "temi_watches", action: "rated", film: "Two for the Money", score: 4 },
];

export default async function Home() {
  const trendingFilms = await getTrendingFilms();

  return <HomeClient trendingFilms={trendingFilms} followingActivity={followingActivity} />;
}
