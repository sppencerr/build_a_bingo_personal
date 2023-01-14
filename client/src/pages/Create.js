import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_CARD, SAVE_LIST } from "../utils/mutations";

function Create() {
  const [listName, setlistName] = useState("");
  const [squareText, setSquareText] = useState("");
  const [squareNumber, setSquareNumber] = useState(1);
  const [squareList, setSquareList] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [listDiv, setListDiv] = useState([<li>{squareText}</li>]);

  const [saveCard] = useMutation(SAVE_CARD);
  const [saveList] = useMutation(SAVE_LIST);

  //function to take in all the individual squares a user has entered and generate a BingoCard document
  async function generateList(squareArray) {
    const locations = [
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "c1",
      "c2",
      "c4",
      "c5",
      "d1",
      "d2",
      "d3",
      "d4",
      "d5",
      "e1",
      "e2",
      "e3",
      "e4",
      "e5",
    ];

    const testArray = [
      "aa",
      "bb",
      "cc",
      "dd",
      "ee",
      "ff",
      "gg",
      "hh",
      "jj",
      "kk",
      "ll",
      "mm",
      "nn",
      "oo",
      "pp",
      "qq",
      "rr",
      "ss",
      "tt",
      "uu",
      "vv",
      "ww",
      "xx",
      "yy",
      "zz",
    ];

    const testArray2 = [
      "aaa",
      "bbb",
      "ccc",
      "ddd",
      "eee",
      "fff",
      "ggg",
      "hhh",
      "iii",
      "jjj",
      "kkk",
      "lll",
      "mmm",
      "nnn",
      "ooo",
      "ppp",
      "qqq",
      "rrr",
      "sss",
      "ttt",
      "uuu",
      "vvv",
      "www",
      "xxx",
      "yyy",
      "zzz",
    ];

    const listInputArray = [];

    if (squareArray.length <= 24) {
      // for (let i = 0; i < squareArray.length; i++) {
      //   //insert a new object conforming to the typeDef {CardSquareInput} into the listInputArray
      //   listInputArray[i] = {
      //     text: squareArray[i],
      //     location: locations[i],
      //     status: false,
      //   };
      // }
      setTextArea("You must have at least 24 entries with no repeats.");
      console.log(listInputArray);
    } else {
      for (let i = 0; i < 24; i++) {
        //make a new copy of the array from which to delete items so they don't repeat
        let arrayCopy = squareArray;

        //pick a random index from the squareArray
        let randomIndex = Math.floor(Math.random() * arrayCopy.length);
        let randomText = arrayCopy[randomIndex];

        //then assign its value to the next location in sequence and remove it from arrayCopy
        listInputArray[i] = randomText;

        arrayCopy.splice(randomIndex, 1);

        console.log("Spliced array: ", arrayCopy);
      }
      console.log("List input after iteration: ", listInputArray);
    }
    console.log("Original array: ", squareArray);
    const newList = await saveList({
      variables: {
        // should be the currently logged-in user
        owner: null,
        name: listName,
        list: listInputArray,
      },
    });

    return newList;
    // return listInputArray;
  }

  const buttonPress = (event) => {
    if (event.keyCode === 13) {
      setSquareList([...squareList, squareText]);
      setSquareNumber(squareNumber + 1);
      setSquareText("");
      setListDiv([...listDiv, <li>{squareText}</li>]);
      return;
    }
  };

  //   async function serverCall (list) {

  //       await saveCard({
  //         variables: { squares: list },
  //       });
  //   }

  

  return (
    <div>
      <div>Choose a name for your bingo list and enter text for each square one at a time. Your list will be randomized in a later step, so order does not matter. </div>
      <div className="my-2 w-full">
        {textArea ? `Message: ${textArea}` : `${textArea}`}
      </div>
      <input
        className="mx-5"
        onChange={(e) => setlistName(e.target.value)}
        placeholder="Name your bingo list"
        type="text"
        value={listName}
        maxLength={34}
      ></input>
      <button
        className="mx-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={function () {
          setlistName(listName);
          console.log("Name of list: ", listName);
          setTextArea(
            `Your list will be known by the legendary moniker '${listName}'`
          );
        }}
      >
        Name List
      </button>
      <input
        className="mx-5"
        onChange={(e) => setSquareText(e.target.value)}
        onKeyDown={(e) => buttonPress(e)}
        // onSubmit={function (e) {e.preventDefault(); setSquareNumber(squareNumber + 1); setSquareText("")}}
        placeholder={`Your text`}
        type="text"
        value={squareText}
        id="square-text"
        maxLength={34}
      ></input>
      <button
        className="mx-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={function () {
          setSquareList([...squareList, squareText]);
          setSquareNumber(squareNumber + 1);
          setSquareText("");
          setListDiv([...listDiv, <li>{squareText}</li>]);
        }}
      >
        Next Square
      </button>
      <button
        className="mx-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={function () {
          setSquareList([]);
          setSquareNumber(1);
          setSquareText("");
          setListDiv([]);
          setTextArea("");
        }}
      >
        Reset
      </button>
      <button
        className="mx-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={function () {
          if (!listName || squareList.length < 24) {
            setTextArea("Your list must be named and have at least 24 entries with no repeats.");
          }
          else {
            generateList(squareList);
            setlistName("");
            setTextArea(`'${listName}' successfully saved!`);
          }
        }}
      >
        Save List!
      </button>
      <div className="grid grid-rows-5">
        {/* trying to get the columns to have only five items before wrapping to a new column */}
        <ol className="grid grid-cols-5">{listDiv}</ol>
      </div>
    </div>
  );
};

export default Create;