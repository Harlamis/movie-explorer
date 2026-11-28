import type { ReactNode } from "react";
import type { Movie } from "../model/types";
import { Star } from "lucide-react";
import { Link } from "react-router";

export interface MovieCardProps {
  movie: Movie;
  actionSlot?: ReactNode;
}

export const MovieCard = ({ movie, actionSlot }: MovieCardProps) => {
  return (
    <article className="group border-border-subtle bg-surface hover:border-border-accent hover:bg-surface-elevated focus-within:ring-brand relative flex h-full w-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 focus-within:ring-2 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-surface-elevated relative aspect-2/3 w-full overflow-hidden">
        <img
          alt={movie.title}
          src={movie.posterUrl}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="border-border-subtle bg-header-glass text-rating absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
          <Star size={12} className="fill-current" />
          {movie.rating.toFixed(1)}
        </span>
        {actionSlot && (
          <div className="absolute top-3 right-3 z-20 rounded-xl">
            {actionSlot}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-primary group-hover:text-brand line-clamp-2 text-base leading-snug font-semibold transition-colors">
          <Link
            to={`/movies/${movie.id}`}
            className="after:absolute after:inset-0 after:z-10 focus:outline-none"
          >
            {movie.title}
          </Link>
        </h3>
        <p className="text-muted text-xs font-medium">{movie.releaseYear}</p>
        <div className="pt-2 mt-auto flex flex-wrap gap-1.5">
          {movie.genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="bg-brand-soft text-secondary rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
