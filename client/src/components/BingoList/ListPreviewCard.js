// OmniList is used to display all the BingoList documents currently in the database
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SubList from "../SubList";
import Card from "../Card";
import Game from '../../Bingo/Bingo';

const ListPreviewCard = ({ lists }) => {
  const [gridContents, setGridContents] = useState([]);

  if (!lists.length) {
    return <h3>No bingo lists yet. Create one to get started!</h3>;
  }


  const clickFunction = function (e) {
    e.preventDefault();
    const cardKey = e.target.getAttribute("dataindex");

  }

  return (
    <div className="container flex flex-wrap">
      {lists &&
        lists.map((list, index) => (
          <div key={list._id}>
            <Link dataindex={list._id} to={`/list/${list._id}`}><button className="p-3 m-1">{list.name}</button></Link>
            {/* <SubList list={list.list} /> */}
          </div>
        ))}
        
    </div>
    
  );
};

export default ListPreviewCard;
