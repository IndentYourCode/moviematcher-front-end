import {useState} from 'react';
import './ViewLists.css'
import wolfs from './assets/wolfs.jpg'

function ViewLists() {

    const [data, setData] = useState(null);
    let [items, setItems] = useState('');

    const submit = async () => {
        console.log('clcicked');

        let u1 = document.getElementById(username1).value;
        let u2 = document.getElementById(username2).value;

        let resp = await fetch('http://localhost:3001/getCommonMovies'+u1+'/'+u2);
        let result = await resp.json();

        let temp = [];
        for(let i = 0;  i < result.length; i++){
            let mov_resp = await fetch('https://api.themoviedb.org/3/movie/550?api_key=498434a91de413f26244ac992e6ffb9c');
            let mov_result = await mov_resp.json();
            temp.push(
                <div class="card">
                <div class="card-body">
                    <h1 class="card-title">{mov_result.original_title}</h1>
                    <h5 class="card-text">{mov_result.overview}</h5>
                </div>
                </div>
            );
        }
        setItems(temp);
    }

    return (
        <>
            <input className="userName" id='username1' placeholder='username1234'></input>
            <input className="userName" id='username2' placeholder='username1234'></input>
            <button onClick={submit} type="button" className="btn btn-outline-success btn-lg">Submit</button>
            {items}

        </>
    );
}

export default ViewLists;