// should receive BingoList.list, not the whole BingoList document
export function listRandomizer(parentList) {
  function shuffle(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  let i = parentList.length;
    console.log("I here!!!!", i);

    const newArray = [];
    console.log("new array here!!!!", newArray);

    for (let i = 0; i < parentList.length; i++) {
        newArray.push(parentList[i]);
    }

  // pare the array down to 24 elements
  for (let i = parentList.length; i > 23; i--) {
    //pick a random index from the parentList
    let randomIndex = Math.floor(Math.random() * parentList.length);
    parentList.splice(randomIndex, 1);
  }

  //Shuffle the remaining array
  const shuffled = shuffle(newArray);

  return shuffled;

  // for (let i = 0; i < 24; i++) {

  //   //pick a random index from the parentList
  //   let randomIndex = Math.floor(Math.random() * parentList.length);
  //   listCopy.push(parentList[randomIndex]);
  //   parentList.splice(randomIndex, 1);
  // };

  // console.log("New array: ", listCopy);

  // return listCopy;
}
