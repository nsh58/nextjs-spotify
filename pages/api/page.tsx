import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Session, withIronSession } from "next-iron-session";
import withSession from "@/lib/session";

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<void>;

type TopTracks = {
  Album: Album
  name: string
}

type Album = {
  album_type: string
}

const recommendedTracks = async (req: any, res: NextApiResponse<TopTracks>) => {
  // セッションからアクセストークンを取り出す
  const accessToken = req.session.get('user').accessToken;

  const TopTracks = await getTopTracks(accessToken)

  // console.log(TopTracks)

  const SavedAlbum = await getSavedAlbum(accessToken)

  console.log(SavedAlbum)

  res.status(200)
  res.json(TopTracks);
};

async function fetchWebApi (endpoint: string, method: string, accessToken: string): Promise<any> {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
    // body:JSON.stringify(body)
  });
  return await res.json();
}

async function getSavedAlbum(accessToken: string) {
  return (await fetchWebApi(
    'v1/me/albums?offset=0&limit=20&locale=ja,en-US;q=0.9,en;q=0.8', 'GET', accessToken
  )).items;
}

async function getTopTracks(accessToken: string){
// Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
return (await fetchWebApi(
  'v1/me/top/tracks?time_range=short_term&limit=5', 'GET', accessToken
)).items;
}

export default withSession(recommendedTracks);
