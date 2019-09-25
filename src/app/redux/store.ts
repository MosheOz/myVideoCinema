import { Movie } from '../models/movie';

export class Store {
    public movies: Movie[];
    public activeEditModal: boolean = false;
    public activeDeleteModal: boolean = false;
    public activeMovieAddModal: boolean = false;
    public isLoading: boolean = false;
    public movieForEdit = new Movie();
}