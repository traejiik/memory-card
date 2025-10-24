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
  const [loading, setLoading] = useState(false);
  const apiUrl = 'https://api.attackontitanapi.com/characters/188,1,2,5,8,10,12,86,87,88,101,184';

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(apiUrl, { mode: 'cors' });
        const characters = await data.json();
        setCharacters(characters);
      } catch {
        console.log('Could not load api');
      } finally {
        setLoading(false);
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
    <>
      <div className="container">
        <header>
          <h1>
            <span className="name">Attack on Titan</span>
            <span className="gameTitle">Memory Game</span>
          </h1>
          <section className="scoreCard">
            <div className="current">
              <p className="title">Current Score:</p>
              <p className="value">{score.current}</p>
            </div>
            <div className="best">
              <p className="title">Best Score:</p>
              <p className="value">{score.best}</p>
            </div>
          </section>
        </header>
        <section className="cardContainer">
          {loading ? (
            <div className='loaderContainer'>
              <div className='loader'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
                  <path
                    fill="none"
                    stroke="#B0B7C3"
                    stroke-width="28"
                    stroke-linecap="round"
                    stroke-dasharray="300 385"
                    stroke-dashoffset="0"
                    d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      calcMode="spline"
                      dur="2"
                      values="685;-685"
                      keySplines="0 0 1 1"
                      repeatCount="indefinite"
                    ></animate>
                  </path>
                </svg>
                <p>loading...</p>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
