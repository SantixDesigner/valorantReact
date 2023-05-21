import { useState } from 'react';
import './Ahorcado.css';

const words = ['astra','brimstone','omen','harbor','viper','gekko','skye','kay/o','breach','sova','fade','sage','chamber','cypher','killjoy','jett','phoenix','neon','raze','yoru','reyna']; // Lista de palabras para adivinar

const HangmanGame = () => {
    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const abecedaryLeters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '/']
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    const handleNewGame = () => {
        const newWord = getRandomWord();
        setWord(newWord);
        setGuesses([]);
        setMistakes(0);
    };

    const handleGuess = (letter) => {
        if (!guesses.includes(letter)) {
            const newGuesses = [...guesses, letter];
            setGuesses(newGuesses);

            if (!word.includes(letter)) {
                setMistakes(mistakes + 1);
            }
        }
    };

    const maskedWord = word
        .split('')
        .map((letter) => (guesses.includes(letter) ? letter : '_'))
        .join(' ')
    const maskWord = word.split('')
        .map((letter) => (letter))
        .join(' ')
    const isGameOver = mistakes >= 6 || maskedWord === maskWord;
    return (
        <div>
            <h1>Juego del Ahorcado (VALORANT)</h1>
            <h2>Hecho por Kovachsito</h2>
            <p>Adivina el agente: {maskedWord}</p>
            {!isGameOver && (
                <p>
                    Errores: {mistakes}/6
                    <br />
                    Letras: {guesses.join(', ')}
                </p>
            )}
            {isGameOver && (
                <p>{maskWord == maskedWord ? '¡Ganaste!, '+word+' está orgulloso' : '¡Perdiste! '+word+' está decepcionado'}</p>
            )}
            <button onClick={handleNewGame}>Nuevo juego...</button>
            {!isGameOver && (
                <div>
                    <p>Elige una letra:</p>
                    <div className='letras'>
                        {abecedaryLeters.map(e => {
                            return (
                                <button onClick={() => handleGuess(e)} key={e}>{e}</button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HangmanGame;