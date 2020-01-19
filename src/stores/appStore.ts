import { first, pluck, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { AppState } from './appState';
import { Store } from './store';
class AppStore extends Store<AppState> {
    constructor() {
        super(new AppState([], [], ""));
    }

    get query() {
        return this.store.query;
    }

    $fetchAlbums(query: string): Observable<AppState> {
        const $search = ajax({
            url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
            method: "GET",
            headers: {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
            }
        })
            .pipe(
                first(),
                pluck("response", "data"),
                map(albums => {
                    this.store = {
                        ...this.store,
                        albums: albums,
                        query: query
                    };
                    return this.store;
                })
            )
        return $search;
    }

    $fetchRadio(): Observable<AppState> {
        const $search = ajax({
            url: `https://deezerdevs-deezer.p.rapidapi.com/radio/lists`,
            method: "GET",
            headers: {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
            }
        })
            .pipe(
                first(),
                pluck("response", "data"),
                map(radio => {
                    this.store = {
                        ...this.store,
                        radio: radio
                    };
                    return this.store;
                })
            )
        return $search;
    }
}

export const AlbumsService = new AppStore();