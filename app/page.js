"use client";
import Deck from "./deck.json";
import { useState, useEffect } from "react";
import Instructions from "./instructions";
import Table from "./table";
import { useSound } from 'use-sound';

export default function Page() {

  const [deckOfCards, setdeckOfCards] = useState(Deck.cards);
  const [discardPile, setDiscardPile] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [boolShuffle, setBoolShuffle] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [insToggle, setInsToggle] = useState(false);

  const [playDraw] = useSound('/sounds/Draw-Card.mp3');
  const [playShuffle] = useSound('/sounds/Card-Shuffle.mp3');

  const values = ['ACE', '2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING'];

  function  shuffle (array){
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


  const shuffleDeck = () => {
    var temp = []
      for (let i = 0; i < 52; i++) {
      temp.push(deckOfCards[i]);
      }
      shuffle(temp);
      setdeckOfCards({...temp});
      playShuffle();
  };

  const reset = () => {
    setShuffled(false);
    setdeckOfCards(Deck.cards);
    setDiscardPile([]);
    setRemaining(52);
    setBoolShuffle(!boolShuffle);
    setScore(0);
    setLives(3);
  }


  const nextCard = () => {
    if(remaining > 1){
      var temp = []
      for (let i = 0; i < remaining; i++) {
      temp.push(deckOfCards[i]);
      }
      temp.shift();
      setDiscardPile([deckOfCards[0], ...discardPile]);
      setdeckOfCards({...temp});
      setRemaining(remaining - 1);
    }
    else{ reset(); }
    playDraw();
  }

  const resolve = (click) => {
    let nextCardValue = "";
    if (remaining > 1){
      if (values.indexOf(deckOfCards[1].value) > values.indexOf(deckOfCards[0].value)){
        nextCardValue = "higher";
      }
      else if (values.indexOf(deckOfCards[1].value) < values.indexOf(deckOfCards[0].value)){
        nextCardValue = "lower";
      }
      else{
        nextCardValue = "equal";
      }
    }
    
    if(remaining == 1){
      reset();
    }
    else if ((click == nextCardValue) || (nextCardValue == "equal")){
      setScore(score + 1);
      if (score + 1 > highScore){
        setHighScore(score + 1);
      }
      nextCard();
    }
    else{
      if (lives == 1){
        reset();
      }
      else{
        setLives(lives - 1);
        nextCard();
      }
    }
  }

  useEffect( ()  => {
    shuffleDeck();
    setShuffled(true);
  }, [boolShuffle]);

  return (
    <main className="bg-green-700 min-h-screen  ">
    
    <Table discardPile={discardPile} deckOfCards={deckOfCards} remaining={remaining} shuffled={shuffled} />
    
    <div className="flex justify-center items-center">
      <div className="m-10 flex items-center text-black">
        <div className="flex flex-col mr-10">
          <button className="m-2 p-2 bg-orange-100 rounded-md max-h-10 " onClick={reset}>Reset</button>
          <button className="m-2 p-2 min-w-40 bg-orange-100 rounded-md max-h-10 " onClick={() => setInsToggle(!insToggle)}>{insToggle ? (<label>Hide Instructions</label>) : (<label>Show Instructions</label>) }</button>
        </div>
        <div className="flex flex-col text-center ml-10">
          <button className="m-2 p-4 bg-orange-100 rounded-md" onClick={() => resolve("higher")}>HIGHER ⬆</button>
          <p className="text-white font-bold">OR</p>
          <button className="m-2 p-4 bg-orange-100 rounded-md" onClick={() => resolve("lower")}>LOWER ⬇</button>
        </div>
      </div>
      <div className="m-10">
        <h1 className="mb-1 p-2">Score: {score}</h1> 
        <h1 className="mb-1 p-2">Lives: {lives}</h1>
        <h1 className="mb-1 p-2">High Score: {highScore}</h1>
        {/*highScore == 51 && (<h1>Congratulations!! You have achieved the highest score possible. </h1>)*/}
      </div>
    </div>

    {insToggle && <Instructions />}
    </main>
  );
}
 