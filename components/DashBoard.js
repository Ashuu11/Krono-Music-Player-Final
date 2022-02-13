import Body from '../components/Body';
import Sidebar from '../components/Sidebar';
import Right from '../components/Right';
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';
import Player from './Player';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });

function DashBoard() {
  const { data: session } = useSession();
  const { accessToken } = session;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };


  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
    <Sidebar/>
    <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
    <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
    {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  )
}

export default DashBoard