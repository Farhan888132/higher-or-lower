export default function Instructions() {
    return (
    <div className="justify-self-start font-sans m-2 mb-0 p-2 ml-3 mt-20 font-extralight opacity-60 text-sm">
        <h1>Instructions:</h1>
        <ul className="list-disc">
            <li>You have to guess whether the next card is higher or lower than the current card</li>
            <li>If you guess correctly, you get a point</li>
            <li>If the value of the next card is equal to the card in play, you get a point</li>
            <li>If you guess incorrectly, you lose a life</li>
            <li>If you lose all 3 lives, the game resets</li>
            <li>Aces are <strong>only</strong> low</li>
            <li>Try and get the highest score possible! Good luck</li>
        </ul>
    </div>
    );
}