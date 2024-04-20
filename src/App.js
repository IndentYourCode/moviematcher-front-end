import Queue from './Queue.js'
import ViewLists from './ViewLists.js'
import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [viewQueue, setViewQueue] = useState(false);

  useEffect(() => {
    setViewQueue(true);
  }, []);

  function test() {
    setViewQueue(!viewQueue);
    console.log(viewQueue);
  }

  let buttonMessage;
  let display;
  if(viewQueue) {
    display = <Queue/>;
    buttonMessage = "View Lists"
  } else {
    display = <ViewLists/>;
    buttonMessage = "View Queue"
  }



  return (
    <div className="App">
      <button onClick={test} type="button" className="btn btn-outline-success btn-lg">{buttonMessage}</button>
      <header className="App-header">
        {display}
      </header>
    </div>
  );
}

export default App;
