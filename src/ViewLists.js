import {useState} from 'react';
import './ViewLists.css'
import wolfs from './assets/wolfs.jpg'

function ViewLists() {

    let [items, setItems] = useState('');
    let [flag, setFlag] = useState(false);
    let [errorText, setErrorText] = useState("");

    const submit = async () => {
        console.log('clcicked');

        setItems('');

        let u1 = document.getElementById('username1').value;
        let u2 = document.getElementById('username2').value;

        if(u1 === "" || u2 === "") {
            setFlag(true);
            return;
        } else {
            setFlag(false);
        }

        let resp = await fetch('http://localhost:3001/getCommonMovies/'+u1+'/'+u2, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3001',
                'Access-Control-Allow-Methods': 'PUT, GET'
              },
        });
        if(!resp.ok) {
            setFlag(true);
            setErrorText(resp.statusText);
            return;
        } else {
            setFlag(false);
        }
        let result = await resp.json();
        result = result.commonMovies;

        let temp = [];
        for(let i = 0;  i < result.length; i++){
            let mov_resp = await fetch('https://api.themoviedb.org/3/movie/' +result[i]+ '?api_key=498434a91de413f26244ac992e6ffb9c');
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

    let displayError = errorText;

    return (
        <>
            <input className="userName" id='username1' placeholder='username1234'></input>
            <input className="userName" id='username2' placeholder='username1234'></input>
            <h1>{flag ? displayError : ""}</h1>
            <button onClick={submit} type="button" className="btn btn-outline-success btn-lg">Submit</button>
            {items}

        </>
    );
}

export default ViewLists;