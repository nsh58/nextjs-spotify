import useSWR from 'swr';
import axios from 'axios';

interface ResponseBody {
    accessToken?: string,
    message?: string
}

const fetcher = (url: string) => axios.post(url).then(res => res.data);

const useLoginApi = () => {
    const { data, error, isValidating, mutate } = useSWR<ResponseBody>(
        '/api/auth/checklogin',
        fetcher,
        {
            shouldRetryOnError: false,
            refreshInterval: 5 * 60 * 1000
        }
    );

    return { data,error, isValidating, mutate }
}

export default useLoginApi;