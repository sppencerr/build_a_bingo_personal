import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_LIST } from '../../utils/queries';
// import SubList from "../SubList";
// import Card from "../Card";
// import Game from '../../Bingo/Bingo';

const List = (props) => {
  let listId = window.location.pathname.split('/').pop();

  const { data } = useQuery(GET_LIST, {
    variables: { listId },
  });
  if (!data) {
      return <h3>No bingo list data. Create one to get started!</h3>;
    } 
    const {name, list, owner, _id } = data.list;
    
  return (
      <div className="container flex flex-col flex-wrap">
          <div>
              <h2 className='p-4 font-bold'>{name}</h2>
          </div>
      <ol>
          {list &&
            list.map((item, index) => (
                <li key={item}>
                <p dataindex={index}>{item}</p>
             </li>
            ))
            }
      </ol>
        
    </div>
    
  );
};

export default List;
