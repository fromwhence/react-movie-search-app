// API Key 85a524247c9bd3a23d160051ac13a80b
// API info https://www.themoviedb.org/settings/api

import React, {useState} from "react"
import MovieCard from "./MovieCard"

function SearchMovies() {

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [results, setResults] = useState('')

  const searchMovies = async (event) => {
    event.preventDefault()

    const url = `https://api.themoviedb.org/3/search/movie?api_key=85a524247c9bd3a23d160051ac13a80b&language=en&query=${query}&page=1&include_adult=false`;

    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results)
      console.log(data)
      setResults(data.total_results)
    } catch(err) {
      console.error(err)
    }
  }
  
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        {/* <label className="label" htmlFor="query">Movie Name</label> */}
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Enter movie title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card-list">
      <p className="results-text">{results} results for '{query}'</p>
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </>
  )
}

export default SearchMovies
