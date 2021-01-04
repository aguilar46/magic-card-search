import { useEffect, useState } from 'react';

const defaultDataSelector = (response) => response.data;

const useLoadData = (
  { requestFn, args, defaultValue, dataSelector = defaultDataSelector },
  deps
) => {
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    requestFn(...args)
      .then(
        (response) => {
          setData(dataSelector(response));
          setError(null);
        },
        (error) => setError(error)
      )
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error, setData];
};

export default useLoadData;
