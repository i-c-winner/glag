import './App.css';
import glagol from '../init'

function App() {
  glagol.on('addTrack', addTrack)
  function click() {
    console.log(glagol.getRemoteStreams())
  }
  function addTrack(...args : any[]){
    console.log(args, 'remoteStreams')
  }
  function local () {
    console.log(glagol.getLocalStream())
  }
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={click}>button</button>
        <button onClick={local}>button</button>
      </header>
    </div>
  );
}

export default App;
