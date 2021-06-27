interface Playlist {
  id: string;
  name: string;
  picture: string;
  tracksAmout: number;
}

interface Track {
  id: number;
  index: number;
  name: string;
  artists: Artist[];
  duration: number;
}

interface Artist {
  id: string;
  name: string;
}