import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useLoginApi from '@/lib/hook/useLoginApi';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const Index = ({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: loginData, error: loginError, mutate: loginMutate } = useLoginApi();
  const login = useCallback(() => {
      window.location.href = loginPath;
  }, [loginPath]);

  return (
    <button onClick={login}>
      login
    </button>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
      props: { loginPath: `https://accounts.spotify.com/authorize?.toString()}` }
  }
};

export default Index;