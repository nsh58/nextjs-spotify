import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Index = ({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const login = useCallback(() => {
      window.location.href = loginPath;
  }, [loginPath]);

  return (
    <button onClick={login}>
        Sign in with Spotify
    </button>
)
}

export const getStaticProps: GetStaticProps = async () => {
  const scopes = [
    'streaming', 
    'user-read-email', 
    'user-read-private', 
    'playlist-modify-public', 
    'playlist-modify-private',
    'user-top-read',
  ];
  const params = new URLSearchParams();
  params.append('client_id', process.env.CLIENT_ID || '');
  params.append('response_type', 'code');
  params.append('redirect_uri', process.env.RETURN_TO || '');
  params.append('scope', scopes.join(' '));
  params.append('state', 'state');
  return {
      props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` }
  }
};

export default Index;