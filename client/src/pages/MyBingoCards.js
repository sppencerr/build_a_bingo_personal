// OmniList is used to display all the BingoList documents currently in the database
import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CARDS_BY_USER } from '../utils/queries';
import Auth from '../utils/auth';
// import SubList from "../SubList";
// import Card from "../Card";
// import Game from '../../Bingo/Bingo';

function MyBingoCards(props) {
  const info = Auth.getProfile();
  const owner = info.data._id;
  const { data } = useQuery(GET_CARDS_BY_USER, {
    variables: { ownerId: owner}
  });

  if (!data) {
    return <h3>No bingo cards yet. Create one to get started!</h3>;
  }
  const cards = data.cardsByUser;
  console.log('cards', cards);

  return (
    <div className="container flex flex-wrap">
      {cards &&
        cards.map((card, index) => (
          <div key={card._id}>
            <Link dataindex={card._id} to={`/card/${card._id}`}><button className="p-3 m-1">{card.parentList.name}</button></Link>
          </div>
        ))}
        
    </div>

  );
};

export default MyBingoCards;
