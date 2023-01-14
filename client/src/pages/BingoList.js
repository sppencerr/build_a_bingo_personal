import React, { useState } from "react";
import Play from './Play'
// Import the `useQuery()` hook from Apollo Client
import { useQuery } from "@apollo/client";

import OmniList from "../components/OmniList";
import {default as ListCard } from '../components/BingoList/ListPreviewCard';

import { GET_LISTS } from "../utils/queries";

const BingoList = () => {
  // useState determines whether or not to show the game grid. Should be attached to a button somewhere
  const [display, setDisplay] = useState("hidden");
  const [parentListId, setParentListId] = useState("")

  const { loading, data } = useQuery(GET_LISTS);

  const lists = data?.lists || [];

  lists.map((list, i) => {

  })

  return (
    <main>
        {loading ? <div>Loading...</div> : <ListCard lists={lists}></ListCard>}
      {/* <Play display={display}/> */}
      
    </main>
    
  );
};

export default BingoList;