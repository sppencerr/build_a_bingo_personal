// OmniList is used to display all the BingoList documents currently in the database
import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_LISTS_BY_USER } from '../utils/queries';
import Auth from '../utils/auth';


function MyBingoLists(props) {
  const info = Auth.getProfile();
  const owner = info.data._id;

  const { data } = useQuery(GET_LISTS_BY_USER, {
    variables: { ownerId: owner}
  });

  if (!data) {
    return <h3>No bingo lists yet. Create one to get started!</h3>;
  }

  const lists = data.listsByUser;
  console.log('lists', lists);

  return (
    <div className="container flex flex-wrap">
      {lists &&
        lists.map((list, index) => (
          <div key={list._id}>
            <Link dataindex={list._id} to={`/list/${list._id}`}><button className="p-3 m-1">{list.name}</button></Link>
          </div>
        ))}
        
    </div>

  );
};

export default MyBingoLists;
