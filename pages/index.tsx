import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&page=1"
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setError("Error fetching movies.");
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&query=${searchTerm}&page=1`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        setError("Error searching movies.");
        console.error("Error searching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to FlickNest</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </form>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="border p-4 rounded shadow cursor-pointer">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                />
                <h2 className="text-xl mt-2">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
