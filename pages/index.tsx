import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&page=1"
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        setError("Error fetching movies.");
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US"
      )
      .then((response) => {
        setCategories(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&query=${searchTerm}&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        setError("Error searching movies.");
        console.error("Error searching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&with_genres=${categoryId}&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        setError("Error fetching movies by category.");
        console.error("Error fetching movies by category:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (searchTerm) {
      setLoading(true);
      setError("");
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&query=${searchTerm}&page=${newPage}`
        )
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          setError("Error searching movies.");
          console.error("Error searching movies:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (selectedCategory) {
      setLoading(true);
      setError("");
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&with_genres=${selectedCategory}&language=en-US&page=${newPage}`
        )
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          setError("Error fetching movies by category.");
          console.error("Error fetching movies by category:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setError("");
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US&page=${newPage}`
        )
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          setError("Error fetching movies.");
          console.error("Error fetching movies:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Search
        </button>
      </form>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a category</option>
          {categories.map((category: { id: number; name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div>
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
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-gray-300 text-gray-700 p-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-gray-300 text-gray-700 p-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
