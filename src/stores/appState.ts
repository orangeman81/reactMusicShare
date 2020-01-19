import { RadioI } from './../models/radio';
import { AlbumsI } from './../models/albums';
export class AppState {
    constructor(
        public albums: Array<AlbumsI>,
        public radio: Array<RadioI>,
        public query: string,
    ) { }
}