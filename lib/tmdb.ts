const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

export type TMDBFilm = {
  id: number;
  title: string;
  year: number;
  poster: string;
  avgRating: number;
};

export async function searchFilm(title: string, year: number): Promise<TMDBFilm | null> {
  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const film = data.results[0];

    return {
      id: film.id,
      title: film.title,
      year: film.release_date ? parseInt(film.release_date.slice(0, 4)) : year,
      poster: film.poster_path
        ? `${TMDB_IMAGE_BASE}${film.poster_path}`
        : "https://placehold.co/300x450/1a1a1a/fff?text=" + encodeURIComponent(film.title),
      avgRating: film.vote_average ? Math.round((film.vote_average / 2) * 10) / 10 : 0,
    };
  } catch (error) {
    console.error("TMDB search error:", error);
    return null;
  }
}

export async function getTrendingFilms(): Promise<TMDBFilm[]> {
  const titles = [
    { title: "Sherlock Holmes", year: 2009 },
    { title: "Two for the Money", year: 2005 },
    { title: "Inception", year: 2010 },
  ];

  const results = await Promise.all(titles.map((t) => searchFilm(t.title, t.year)));

  return results.filter((f): f is TMDBFilm => f !== null);
}
