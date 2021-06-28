export function processPlaylist(raw: RawPlaylist): Playlist {
  const playlist: Playlist = {
    id: raw.id,
    name: raw.name,
    tracksAmount: raw.tracks.total,
    picture: raw.images[0].url,
  };

  return playlist;
}

interface processedTracks {
  tracks: Track[];
  limit: number;
  total: number;
  offset: number;
}

export function processTracks(raw: RawTracks): processedTracks {
  return {
    tracks: raw.items.map(t => ({
      id: t.track.id,
      index: t.track.track_number,
      name: t.track.name,
      artists: t.track.artists.map(a => ({ id: a.id, name: a.name })),
      duration: t.track.duration_ms,
    })),
    limit: raw.limit,
    total: raw.total,
    offset: raw.offset,
  }
}