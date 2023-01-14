import React, { useState } from 'react'
import Button from './Button.jsx';

const squareSize = "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"

let Game = ({gridContents}) => {

    function shuffle(array) {
        var m = array.length,
          t,
          i;
    
        // While there remain elements to shuffle…
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
    
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
    
        return array;
      }

    let i = gridContents.length;
    console.log("I here!!!!", i);

    const newArray = [];
    console.log("new array here!!!!", newArray);

    for (let i = 0; i < gridContents.length; i++) {
        newArray.push(gridContents[i]);
    }

    const shuffled = shuffle(newArray);
    console.log("SHUFFLED ARRAY", shuffled)

    return (

        <div className='container'>
            <div className='grid mt-3 grid-rows-5 gap-1'>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><Button className="bingo-button" id="0" text={shuffled[0]} /></div>
                    <div className={squareSize}><Button className="bingo-button" id="1" text={shuffled[1]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="2" text={shuffled[2]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="3" text={shuffled[3]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="4" text={shuffled[4]}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><Button className="bingo-button" id="5" text={shuffled[5]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="6" text={shuffled[6]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="7" text={shuffled[7]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="8" text={shuffled[8]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="9" text={shuffled[9]}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><Button className="bingo-button" id="10" text={shuffled[10]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="11" text={shuffled[11]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="12" /></div>
                    <div className={squareSize}><Button className="bingo-button" id="13" text={shuffled[12]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="14" text={shuffled[13]}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><Button className="bingo-button" id="15" text={shuffled[14]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="16" text={shuffled[15]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="17" text={shuffled[16]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="18" text={shuffled[17]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="19" text={shuffled[18]}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><Button className="bingo-button" id="20" text={shuffled[19]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="21" text={shuffled[20]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="22" text={shuffled[21]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="23" text={shuffled[22]}/></div>
                    <div className={squareSize}><Button className="bingo-button" id="24" text={shuffled[23]}/></div>
                </div>

            </div>
        </div>
    )

}

export default Game


