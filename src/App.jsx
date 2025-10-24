import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';

function App() {
  const [score, setScore] = useState({
    current: 0,
    best: 0,
  });
  const [characters, setCharacters] = useState([]);
  const [clicked, setClicked] = useState([]);
  const apiUrl = 'https://api.attackontitanapi.com/characters/188,1,2,5,8,10,12,86,87,88,101,184';

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(apiUrl, { mode: 'cors' });
        const characters = await data.json();
        setCharacters(characters);
      } catch {
        console.log('Could not load api');
      }
    })();
  }, []);

  const shuffle = (list) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleCardClick = (id) => {
    const hasBeenClicked = clicked.includes(id);

    setScore(({ current, best }) => {
      if (hasBeenClicked) {
        return { current: 0, best: Math.max(best, current) };
      }

      const nextCurrent = current + 1;
      return { current: nextCurrent, best: Math.max(best, nextCurrent) };
    });

    setClicked((prev) => (hasBeenClicked ? [] : [...prev, id]));

    setCharacters((prev) => shuffle(prev));
  };

  return (
    <div className="container">
      <div className="scoreCard">
        <div>
          <p>Score</p>
          <p>{score.current}</p>
        </div>
        <div>
          <p>Best Score</p>
          <p>{score.best}</p>
        </div>
      </div>
      <div className="cardContainer">
        {characters.map((character) => {
          return (
            <Card
              key={character.id}
              img={character.img}
              id={character.id}
              name={character.name}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
