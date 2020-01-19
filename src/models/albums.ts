export interface AlbumsI {
    id: number;
    title: string;
    preview: string;
    artist: {
        name: string
    },
    album: {
        cover_medium: string
    }
}