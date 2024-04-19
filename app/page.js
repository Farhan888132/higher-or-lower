"use client";
import Image from "next/image";
import Deck from "./deck.json";
import { useState, useEffect } from "react";

export default function Page() {

  const [deckOfCards, setdeckOfCards] = useState(Deck.cards);
  const [discardPile, setDiscardPile] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [boolShuffle, setBoolShuffle] = useState(false);

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

  useEffect(() => {
    shuffleDeck();
  }, [boolShuffle]);

  return (
    <main>
    <div className="flex justify-around">

      {remaining > 0 && (
        <div>
          <h1>Deck</h1>
          <Image src={deckOfCards[0].image} width={226} height={314} alt={deckOfCards[0].code} />
          <h1>{deckOfCards[0].code}</h1>
          <h1>Remaining: {remaining}</h1>
        </div>
      )}
      

      {discardPile.length > 0 && (
        <div>
          <h1>Discard Pile</h1>
          <Image src={discardPile[0].image} width={226} height={314} alt={discardPile[0].code} />
          <h1>{discardPile[0].code}</h1>
        </div>
      
      )}
    </div>
    <div className="mt-10">
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={nextCard}>Next Card</button>
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={reset}>Reset</button>
      <button className="m-2 p-2 bg-cyan-700 rounded-md" onClick={shuffleDeck}>Shuffle</button>
    </div>
    </main>
  );
} 
