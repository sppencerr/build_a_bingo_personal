// OmniList is used to display all the BingoList documents currently in the database
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import OmniListButton from "./OmniListButton";
import Game from "../Bingo/Bingo";
import { listRandomizer } from "../utils/listRandomizer";
import { cardGenerator } from "../utils/cardGenerator";
import { SAVE_CARD } from "../utils/mutations";

const styles = {
  heading: { fontWeight: "bold" },
};

const OmniList = ({ lists }) => {
  const [gridContents, setGridContents] = useState([]);
  const [display, setDisplay] = useState(false);

  const [saveCard] = useMutation(SAVE_CARD);

  if (!lists.length) {
    return <h3>No bingo lists yet. Create one to get started!</h3>;
  }

  // const [gameHidden, setGameHidden] = useState(true);

  const clickFunction = async function (e) {
    e.preventDefault();

    const buttonKey = e.target.getAttribute("dataindex");
    const subList = lists[buttonKey].list;

    console.log(subList);

    setGridContents(subList);
    setDisplay(!display);
  };

  // return (
  //   <div className="container flex flex-wrap">
  //     {lists &&
  //       lists.map((list, index) => (
  //         <div className="m-2">
  //           <button
  //             style={styles.heading}
  //             dataindex={index}
  //             onClick={clickFunction}
  //           >
  //             {list.name}
  //           </button>
  //           <h4 style={styles.heading}></h4>
  //           {/* <SubList list={list.list} /> */}
  //         </div>
  //       ))}
  //     <div className="container">
  //       <Game gridContents={gridContents} />
  //     </div>
  //   </div>
  // );

  return (
    <div>

      <div className="grid grid-cols-10 mx-5 rounded-md shadow-sm" role="group">
        {lists &&
          lists.map((list, index) => (
            
              <button
                type="button"
                onClick={clickFunction}
                dataindex={index}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-sm rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center sm:mr-2 sm:mb-2"
              >
                {list.name}
              </button>
          ))}
      </div>
      
        <div
          className={display ? "visible col-span-5" : "invisible col-span-0"}
        >
          <Game gridContents={gridContents} />
        </div>
    </div>
  );
};

export default OmniList;
