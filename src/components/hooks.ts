import { useRef, useEffect } from "react";
import {url} from "../helpers/config.json";
import useSWR from 'swr';
import axios from "axios";


export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export function useUser(token) {
  const {data, error} = useSWR(token ? `${url}/user/data` : null, url => axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data), {
    refreshInterval: 5000
  });
  return {
    userData: data,
    isLoading: !error && !data,
    isError: error
  }
}
