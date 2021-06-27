interface Playlist {
  id: string;
  name: string;
  picture: string;
  tracksAmount: number;
}

interface Track {
  id: string;
  index: number;
  name: string;
  artists: Artist[];
  duration: number;
  url: string;
}

interface Artist {
  id: string;
  name: string;
}

interface RawPlaylist {
  id: string;
  name: string;
  tracks: {
    total: number;
  };
  images: Array<{
    url: string;
  }>;
}

interface RawTracks {
  tracks: {
    items: Array<{
      track: {
        id: string;
        name: string;
        track_number: number;
        href: string;
        duration_ms: number;
        artists: Array<Artist>
      }
    }>;
  };
  limit: number;
  offset: number;
  total: number;
}