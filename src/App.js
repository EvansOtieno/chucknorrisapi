
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [jokes, setJoke] = useState({
    joke: ''
  });
  const [categories, setCategory] = useState([]);

  useEffect( () => {
    fetchjoke();

  }, []);

  const fetchjoke = async () => {
    const results = await axios.get('https://api.chucknorris.io/jokes/random');
    const btns = await axios.get('https://api.chucknorris.io/jokes/categories');
    setCategory(btns.data);
    setJoke({
      ...jokes,
      joke: results.data.value
    })
  }

  const resetjoke = async (cat) => {
    console.log(cat.category);
    const results = await axios.get(`https://api.chucknorris.io/jokes/random?category=${cat.category}`);
    setJoke({
      ...jokes,
      joke: results.data.value
    })
  }
  const handleClick = (cat, e) => {
    e.preventDefault(); 
    
    resetjoke(cat);
  }
  return (
    <div class="b">
      <h2>Select Joke According To Buttons Bellow</h2>
      <div class="bts">
      {categories.map(category => {
        return (<button onClick={(e) => handleClick({ category }, e)}>{category}</button>
        )
      }
      )}</div>
      <h3>{jokes.joke}</h3>
    </div>
  );
}

export default App;
