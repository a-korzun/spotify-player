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
  artists: Array<{
    id: string;
    name: string;
  }>;
  duration: number;
}

interface Artist {
  id: string;
  name: string;
  genres: string[];
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
  items: Array<{
    track: {
      id: string;
      name: string;
      track_number: number;
      href: string;
      duration_ms: number;
      artists: Array<{ id: string, name: string }>;
    }
  }>;
  limit: number;
  offset: number;
  total: number;
}

interface RawArtists {
  artists: Array<Artist>;
}

interface Window {
  webkitAudioContext: Window['AudioContext'];
}
