import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Movie } from "../../types/Movie";
import Image from "next/image";

const Category = () => {
  const router = useRouter();
  const { name } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (name) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&with_genres=${name}&language=en-US&page=1`
        )
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [name]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Category: {name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded shadow">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
            <h2 className="text-xl mt-2">{movie.title}</h2>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
