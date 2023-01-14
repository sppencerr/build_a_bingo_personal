// each BingoList document contains a 'list' field. SubList is used to iterate through that 'list' field 
// and create an <li> element for each
import React from "react";

const SubList = ({ list }) => {
    return (
        <ul className="">
          {list &&
            list.map((listItem) => (
              <li key={listItem}>{listItem}</li>
            ))}
        </ul>
      );
}

export default SubList;