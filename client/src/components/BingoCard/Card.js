import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CARD } from '../../utils/queries';
import CardSquareButton from './CardSquareButton';

const squareSize = "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"

const List = (props) => {
    let cardId = window.location.pathname.split('/').pop(); 

  const { data } = useQuery(GET_CARD, {
    variables: { cardId },
  });
  if (!data) {
      return <h3>No bingo card data. Create one to get started!</h3>;
    } 
  const { _id, status } = data.card;
  const { username, email } = data.card.owner;
  const [...squares] = data.card.squares;
    
  return (
      <div className="container flex flex-col flex-wrap">
          <div className='container'>
            <div className='grid mt-3 grid-rows-5 gap-1'>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[0].status} className="bingo-button" id="0" location="a1" text={squares[0].text} /></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[1].status} className="bingo-button" id="1" location="b1" text={squares[1].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[2].status} className="bingo-button" id="2" location="c1" text={squares[2].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[3].status} className="bingo-button" id="3" location="d1" text={squares[3].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[4].status} className="bingo-button" id="4" location="e1" text={squares[4].text}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[5].status} className="bingo-button" id="5" location="a2" text={squares[5].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[6].status} className="bingo-button" id="6" location="b2" text={squares[6].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[7].status} className="bingo-button" id="7" location="c2" text={squares[7].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[8].status} className="bingo-button" id="8" location="d2" text={squares[8].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[9].status} className="bingo-button" id="9" location="e2" text={squares[9].text}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[10].status} className="bingo-button" id="10" location="a3" text={squares[10].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[11].status} className="bingo-button" id="11" location="b3" text={squares[11].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[12].status} className="bingo-button" id="12" location="c3" text={squares[12].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[13].status} className="bingo-button" id="13" location="d3" text={squares[13].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[14].status} className="bingo-button" id="14" location="e3" text={squares[14].text}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[15].status} className="bingo-button" id="15" location="a4" text={squares[15].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[16].status} className="bingo-button" id="16" location="b4" text={squares[16].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[17].status} className="bingo-button" id="17" location="c4" text={squares[17].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[18].status} className="bingo-button" id="18" location="d4" text={squares[18].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[19].status} className="bingo-button" id="19" location="e4" text={squares[19].text}/></div>
                </div>
                <div className='grid grid-cols-5 gap-1'>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[20].status} className="bingo-button" id="20" location="a5" text={squares[20].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[21].status} className="bingo-button" id="21" location="b5" text={squares[21].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[22].status} className="bingo-button" id="22" location="c5" text={squares[22].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[23].status} className="bingo-button" id="23" location="d5" text={squares[23].text}/></div>
                    <div className={squareSize}><CardSquareButton cardId={cardId} squareStatus={squares[24].status} className="bingo-button" id="24" location="e5" text={squares[24].text}/></div>
                </div>

            </div>
        </div>
        
    </div>
    
  );
};

export default List;
