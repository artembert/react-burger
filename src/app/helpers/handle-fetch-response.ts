export const handleFetchResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
