const fetcher = async (url: string) => fetch(url).then((res) => res.json());
export default fetcher;
