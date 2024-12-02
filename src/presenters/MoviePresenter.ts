export const fetchMovies = async (query: string) => {
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
};
