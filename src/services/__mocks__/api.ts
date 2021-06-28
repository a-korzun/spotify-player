export const fetchArtists = async () => {
  return { artists:
    [
      {
        id: '1',
        name: 'Artist 1',
        genres: ['pop']
      },
      {
        id: '2',
        name: 'Artist 2',
        genres: ['rock']
      },
    ]
  }
};

export const fetchPlaylist = async () => {
  return {
    id: '1',
    name: 'playlist 1',
    tracks: {
      total: 99,
    },
    images: [{ url: 'foo' }]
  }
}

export const fetchTracks = async (accessToken: string, playlistID: string, offset = 0) => {
  return {
    items: Array.from({ length: 100 }, () => ({
      track: {
        id: '1',
        name: 'foo',
        track_number: '1',
        href: 'http://spotify.com/v1/foo',
        duration_ms: '999',
        artists: [{ id: '1', name: 'foo' }],
      }
    })),
    limit: 100,
    offset,
    total: 300,
  };
}

export const fetchAudio = async (accessToken: string, id: string) => {
  return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
}
