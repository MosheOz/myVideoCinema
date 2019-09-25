import { Store } from './store';
import { Action } from './action';
import { ActionType } from './action-type';

export class Reducer {
    public static reduce(oldStore: Store, action: Action): Store {

        const newStore = { ...oldStore };

        switch (action.type) {

            case ActionType.GetAllMovies:
                newStore.movies = action.payload;
                break;

            case ActionType.ActiveEditModal:
                newStore.activeEditModal = true;
                break;

            case ActionType.MovieForEdit:
                newStore.movieForEdit = action.payload;
                break;

            case ActionType.UpdateMovie:
                for (let i = 0; i < newStore.movies.length; i++) {
                    if (newStore.movies[i].id === action.payload.id) {
                        newStore.movies[i] = action.payload;
                        break;
                    }
                }
                break;

            case ActionType.AddMovie:
                newStore.movies.push(action.payload);
                break;

            case ActionType.ActiveMovieAddModal:
                newStore.activeMovieAddModal = true;
                break;

            case ActionType.DeleteMovie:
                for (let i = 0; i < newStore.movies.length; i++) {
                    if (newStore.movies[i].id == action.payload) {
                        newStore.movies.splice(i, 1);
                        break;
                    }
                }
                break;
        }
        return newStore;
    }
}