import React, { useState } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [synonym, setSynonym] = useState([]);

  const handleClick = () => {
    if (word) {
      console.log('Fetching synonyms for word:', word);
      fetch('https://api.datamuse.com/words?rel_syn=' + word)
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);
          setSynonym(data);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const renderSynonyms = () => {
    return (
      <ul>
        {synonym.map((synonymWord, index) => (
          <li key={index}>{synonymWord.word}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className='App'>
      <h1>Synonym Generator</h1>
      <div>
        <label>Please Enter Word</label>
        <input
          className='wordInput'
          type='text'
          name='word'
          value={word}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
      <h2>List of Synonyms</h2>
      <div>{renderSynonyms()}</div>
    </div>
  );
}

export default App;
