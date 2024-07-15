import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Movie } from "../../types/Movie";
import Image from "next/image";
import Link from "next/link";

const Category = () => {
  const router = useRouter();
  const { name } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (name) {
      setLoading(true);
      setError("");
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&with_genres=${name}&language=en-US&page=${page}`
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
  }, [name, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Category: {name}</h1>
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
  );
};

export default Category;
