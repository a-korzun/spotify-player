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

export const fetchPlaylist = async (accessToken: string, playlistID: string): Promise<PlaylistPreview> => {
  return {
    id: playlistID,
    name: 'playlist ' + playlistID,
    tracks: {
      total: 99,
    },
    images: [{ url: 'foo' }]
  }
}

export const fetchTracks = async (accessToken: string, playlistID: string, offset = 0): Promise<Playlist> => {
  return {
    items: Array.from({ length: 100 }, () => ({
      track: {
        id: '1',
        name: 'foo',
        preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration_ms: 999,
        artists: [{ id: '1', name: 'foo' }],
      }
    })),
    limit: 100,
    total: 300,
  };
}
