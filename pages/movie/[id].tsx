import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Movie } from "../../types/Movie";
import Image from "next/image";

interface CastMember {
  id: number;
  name: string;
  character: string;
}

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError("");
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US`
        )
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          setError("Error fetching movie details.");
          console.error("Error fetching movie details:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=cb316d4945cc6ec4cfbd735eb6ee2a06&language=en-US`
        )
        .then((response) => {
          setCast(response.data.cast);
        })
        .catch((error) => {
          setError("Error fetching cast.");
          console.error("Error fetching cast:", error);
        });
    }
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!movie) return <div className="text-center">Movie not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        {movie.title}
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded"
            priority={true}
          />
        </div>
        <div className="md:w-2/3 md:ml-8 mt-8 md:mt-0">
          <p className="mt-4 text-lg text-gray-700">{movie.overview}</p>
          <p className="mt-4 text-lg">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mt-4 text-lg">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <h2 className="text-2xl font-bold mt-8">Cast</h2>
          <ul className="list-disc list-inside">
            {cast.map((member, index) => (
              <li key={index} className="mt-2 text-lg">
                <strong>{member.name}</strong> as {member.character}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
