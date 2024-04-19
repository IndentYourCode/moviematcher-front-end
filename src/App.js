import Poster from './Poster.js'
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [index, setIndex] = useState(0);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      const resp = await fetch('https://api.themoviedb.org/3/discover/movie?page='+ page + '&api_key=498434a91de413f26244ac992e6ffb9c');
      const result = await resp.json();
      setData(result.results);
    }
    fetchMovies();
  }, [page]);

  const like = async () => {
    const body = {
      username: document.getElementById('username').value,
      yesMovie: data[index].id,
    }
    let resp = await fetch('http://localhost:3001/updateUserData', {
      method: 'POST',
      body: body,
    });

    console.log(body);
    if(!((index+1) % 20)) {
      setPage(page+1);
      setIndex(0);
    } else {
      setIndex(index+1);
    }
  }
  const passed = async () => {
    const body = {
      username: document.getElementById('username').value,
      noMovie: data[index].id
    }
    console.log(body);
    if(!((index+1)%20)) {
      setPage(page+1);
      setIndex(0);
    } else {
      setIndex(index+1);
    }
  }

  const loading_curr = {
    original_title: "Loading...",
    overview: "loading...",
    poster_path: ""
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <input className="userName" id='username' placeholder='username1234'></input>
              <button onClick={like} type="button" className="btn btn-outline-success btn-lg">Like</button>
            </div>
            <div className="col-sm poster-background">
              <Poster curr={data ? data[index] : loading_curr}/>
            </div>
            <div className="col-sm">
              <button onClick={passed} type="button" className="btn btn-outline-success btn-lg">Dislike</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
