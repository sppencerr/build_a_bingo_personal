// parentList parameter should be an array of bingo terms.
// cardGenerator returns an array of objects corresponding to the cardSquareInput typeDef

export const cardGenerator = function (parentList) {
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

      const cardSquareInputArray = [];

      const listCopy = parentList;

        for (let i = 0; i < 24; i++) {
          //make a new copy of the array from which to delete items so they don't repeat
  
          //pick a random index from the parentList
          let randomIndex = Math.floor(Math.random() * listCopy.length);
          let randomText = listCopy[randomIndex];
  
          //then assign its value to the next location in sequence and remove it from listCopy
          cardSquareInputArray[i] = {
            text: randomText,
            location: locations[i],
            status: false
          };
  
          listCopy.splice(randomIndex, 1);
  
          console.log("Spliced array: ", listCopy);
        }
        console.log("List input after iteration: ", cardSquareInputArray);

        return cardSquareInputArray;

      }


