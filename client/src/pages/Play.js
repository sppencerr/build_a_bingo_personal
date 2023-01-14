import React, { useState } from "react";
import Game from "../Bingo/Bingo";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_CARD, SAVE_LIST } from "../utils/mutations";
import { GET_LIST } from "../utils/queries";
import { cardGenerator } from "../utils/cardGenerator";
import { listRandomizer } from '../utils/listRandomizer';

function Play({ parentListId, display, randomizedList }) {

  //   create a useQuery to fetch the right list
  const { data } = useQuery(GET_LIST, {
    variables: { parentListId },
  });

  const [saveCard] = useMutation(SAVE_CARD);

  // create a new BingoCard document in the database to go along with it
//   const squares = cardGenerator(parentListList);

//   const newCard = saveCard({
//     variables: {
//     //owner field should be the ID of the user who created whatever list has been selected
//       owner: null,
//       parentList: parentListId,
//       squares: squares,
//       status: false
//     },
//   });

  return (
    <div className={display}>
      {/* <Game squareContents={randomizedList}/> */}
    </div>
  );
}

export default Play;
