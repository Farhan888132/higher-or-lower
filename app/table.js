import Image from 'next/image';

export default function Table({discardPile, deckOfCards, remaining, shuffled}) {
    return (
        <div className="m-2 mt-0 p-2 flex justify-around">
        {discardPile.length > 0 && (
            <div className="m-2 p-8 rounded-2xl text-center bg-black bg-opacity-40 ">
            <h1 className='mb-4'>Previous Card</h1>
            <div className="w-72 flex flex-row-reverse">
                <Image className="z-50" src={discardPile[0].image} width={205} height={285} alt={discardPile[0].code} />
                {discardPile.length > 1 && (
                <Image  className="z-40 relative left-40" src={discardPile[1].image} width={205} height={285} alt={discardPile[1].code} />
                )}
                {discardPile.length > 2 && (
                <Image className="z-30 relative left-80" src={discardPile[2].image} width={205} height={285} alt={discardPile[2].code} />
                )}
            </div>
            </div>
        
        )}

        {remaining > 0 && shuffled && (
            <div className="w-72 m-2 p-10 ml-40 mr-32 bg-black rounded-2xl bg-opacity-40 text-center">
            <h1 className='mb-4'>Card in play</h1>
            <Image src={deckOfCards[0].image} width={205} height={285} alt={deckOfCards[0].code} />
            </div>
        )}

        <div className="w-72 m-2 pl-10 pr-10 pt-10 pb-6 bg-black text-center rounded-2xl bg-opacity-40">
            <h1 className="opacity-0 ">.</h1>
            <Image src="/back.png" width={205} height={285} alt="back" />
            <h1 className='mt-4'>Remaining: {remaining-1}</h1>
        </div>
        </div>
    );
}