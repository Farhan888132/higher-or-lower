"use client";
import Image from "next/image";
import Deck from "./deck.json";
import { useState, useEffect } from "react";
import next from "next";

export default function Page() {

  const [deckOfCards, setdeckOfCards] = useState(Deck.cards);
  const [discardPile, setDiscardPile] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [boolShuffle, setBoolShuffle] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);

  const values = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];
  const suits = ['SPADES','HEARTS','CLUBS','DIAMONDS'];

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
  };

  const reset = () => {
    setdeckOfCards(Deck.cards);
    setDiscardPile([]);
    setRemaining(52);
    setBoolShuffle(!boolShuffle);
    setScore(0);
    setLives(3);
  }


  const nextCard = async () => {
    if(remaining > 1)
    {
      var temp = []
      for (let i = 0; i < remaining; i++) {
      temp.push(deckOfCards[i]);
      }
      temp.shift();
      setDiscardPile([deckOfCards[0], ...discardPile]);
      setdeckOfCards({...temp});
      setRemaining(remaining - 1);
    }
    else
    {
      reset();
    }
    
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
    
    if(remaining == 1)
    {
      reset();
    }
    else if ((click == nextCardValue) || (nextCardValue == "equal"))
    {
      setScore(score + 1);
      if (score + 1 > highScore){
        setHighScore(score + 1);
      }
      nextCard();
    }
    else
    {
      if (lives == 1){
        reset();
      }
      else{
        setLives(lives - 1);
        nextCard();
      }
    }
  }

  useEffect(() => {
    shuffleDeck();
  }, [boolShuffle]);

  return (
    <main>
    
    <div className="m-2 p-2 flex  justify-center">
      {discardPile.length > 0 && (
        <div className="m-2 p-2 float-left">
          <h1>Previous Card</h1>
          <Image src={discardPile[0].image} width={226} height={314} alt={discardPile[0].code} />
        </div>
      
      )}

      {remaining > 0 && (
        <div className="m-2 p-2">
          <h1>Card in play</h1>
          <Image src={deckOfCards[0].image} width={226} height={314} alt={deckOfCards[0].code} />
        </div>
      )}

      <div className="m-2 p-2">
        <h1 className="opacity-0">.</h1>
        <Image src="/back.png" width={226} height={314} alt="back" />
        <h1>Remaining: {remaining-1}</h1>
      </div>
    </div>

    <div className="float-right">
      <h1>Rules:</h1>
      <p>1. You have to guess whether the next card is higher or lower than the current card.</p>
      <p>2. If you guess correctly, you get a point and the next card is revealed.</p>
      <p>3. If you guess incorrectly, you lose a life and the next card is revealed.</p>
      <p>4. If you lose all 3 lives, the game resets.</p>
      <p>5. If you get 51 points, you win the game.</p>
      <p>6. Aces are high</p>
    </div>
    
    <div className="mt-10">
      {/* <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={nextCard}>Next Card</button> */}
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={reset}>Reset</button>
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={() => resolve("higher")}>Higher</button>
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={() => resolve("lower")}>Lower</button>
    </div>
    <div className="mt-10">
      <h1>Score: {score}</h1> 
      <h1>Lives: {lives}</h1>
      <h1>High Score: {highScore}</h1>
      {highScore == 51 && (<h1>Congratulations!! You have achieved the highest score possible. </h1>)}
    </div>
    </main>
  );
} 
