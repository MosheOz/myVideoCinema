import { Genre } from './genre';

export class Movie {
    public constructor(
        public id?: number,
        public title?: string,
        public release_date?: string,
        public runtime?: number,
        public genres?: Array<Genre>,
        public director?: any,
        public overview?: any,
        public poster_path?: any,
        public backdrop_path?: any,
        public isExist?: boolean
    ) {

    }
}