export interface AlbumsI {
    title: string;
    preview: string;
    artist: {
        name: string
    },
    album: {
        cover_medium: string
    }
}