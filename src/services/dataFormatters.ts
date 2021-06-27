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
    tracks: raw.tracks.items.map(t => ({
      id: t.track.id,
      index: t.track.track_number,
      name: t.track.name,
      artists: t.track.artists.map(a => ({ name: a.name, id: a.id })),
      duration: t.track.duration_ms,
      url: t.track.href,
    })),
    limit: raw.limit,
    total: raw.total,
    offset: raw.offset,
  }
}