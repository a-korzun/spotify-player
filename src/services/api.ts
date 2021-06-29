export async function retrieveAccessToken(): Promise<string> {
  const accessToken = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${process.env.REACT_APP_SPOTIFY_TOKEN}`,
    },
    body: 'grant_type=client_credentials',
  })
    .then(res => res.json())
    .then(res => res.access_token);

  return accessToken;
}

export async function fetchPlaylist(accessToken: string, playlistID: string): Promise<PlaylistPreview> {
  const data = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json());

  return data;
}

export async function fetchTracks(accessToken: string, playlistID: string, offset = 0): Promise<Playlist> {
  const data = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())

  return data;
}


export async function fetchArtists(accessToken: string, ids: string[]): Promise<{ artists: Artist[] }> {
  const data = await fetch(`https://api.spotify.com/v1/artists?ids=${ids.join(',')}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())

  return data;
}
