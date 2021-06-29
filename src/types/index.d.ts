interface Track {
  id: string;
  name: string;
  preview_url: string;
  duration_ms: number;
  artists: Array<Omit<Artist, 'genres'>>;
}

interface Artist {
  id: string;
  name: string;
  genres: string[];
}

interface PlaylistPreview {
  id: string;
  name: string;
  tracks: {
    total: number;
  };
  images: Array<{
    url: string;
  }>;
}

interface Playlist {
  items: Array<{
    track: Track;
  }>;
  limit: number;
  total: number;
}

interface Window {
  webkitAudioContext: Window['AudioContext'];
}
