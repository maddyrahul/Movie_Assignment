import { Show } from "./show.model";

export interface Movie {
  movieId: number;
  name: string;
  genre: string;
  director: string;
  description: string;
  shows: Show[];
}

  
