import './App.css';
import Card from './components/Card.js';
import React, {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState(null);
  const [newC, setNewC] = useState(false);
  
  const remove = (e) =>{
    const obj = e.target.parentNode.id;
    fetch(`http://localhost:7070/notes/${obj}`, { method: 'DELETE' })
        .then(() => newC ? setNewC(false): setNewC(true));
  };

  useEffect(() => {
      let isLoading = true;
      if(isLoading) {
          fetch('http://localhost:7070/notes')
              .then(response => response.json())
              .then(data => setData(data));
          return (() => {isLoading = false});
      };
  }, [newC]);

  return <div>
    <h1>Notes
      <div className='update' 
          onClick={() => newC ? setNewC(false): setNewC(true)}>
      </div>
    </h1>
    <ul className='cards-list'>
      {data ? data.map(el => {
        return <li key={el.id}>
          <Card id={el.id} context={el.context} remove={remove}/>
        </li>
      }): null}
    </ul>
    <label className='newNote' htmlFor="newNote">New Note</label>
    <Card name='newNote' newC={newC} setNewC={setNewC}/>
  </div>
};

export default App;
