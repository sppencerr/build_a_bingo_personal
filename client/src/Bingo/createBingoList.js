import React from "react";

const Create = () => {

  return (
    <div className="create">
      <h1>Create New Card</h1>
      <form id="gameForm">
        <label>New Card Title:</label>
        <input type="text" required maxLength="50"  className="cardTitle" />
        <label>Square 0:</label>
        <input type="text" required maxLength="34" className="name0" />
        <label>Square 1:</label>
        <input type="text" required maxLength="34" className="name1" />
        <label>Square 2:</label>
        <input type="text" required maxLength="34" className="name2" />
        <label>Square 3:</label>
        <input type="text" required maxLength="34" className="name3" />
        <label>Square 4:</label>
        <input type="text" required maxLength="34" className="name4" />
        <label>Square 5:</label>
        <input type="text" required maxLength="34" className="name5" />
        <label>Square 6:</label>
        <input type="text" required maxLength="34" className="name6" />
        <label>Square 7:</label>
        <input type="text" required maxLength="34" className="name7" />
        <label>Square 8:</label>
        <input type="text" required maxLength="34" className="name8" />
        <label>Square 9:</label>
        <input type="text" required maxLength="34" className="name9" />
        <label>Square 10:</label>
        <input type="text" required maxLength="34" className="name10" />
        <label>Square 11:</label>
        <input type="text" required maxLength="34" className="name11" />
        <label>Square 12:</label>
        <input type="text" required maxLength="34" className="name12" />
        <label>Square 13:</label>
        <input type="text" required maxLength="34" className="name13" />
        <label>Square 14:</label>
        <input type="text" required maxLength="34" className="name14" />
        <label>Square 15:</label>
        <input type="text" required maxLength="34" className="name15" />
        <label>Square 16:</label>
        <input type="text" required maxLength="34" className="name16" />
        <label>Square 17:</label>
        <input type="text" required maxLength="34" className="name17" />
        <label>Square 18:</label>
        <input type="text" required maxLength="34" className="name18" />
        <label>Square 19:</label>
        <input type="text" required maxLength="34" className="name19" />
        <label>Square 20:</label>
        <input type="text" required maxLength="34" className="name20" />
        <label>Square 21:</label>
        <input type="text" required maxLength="34" className="name21" />
        <label>Square 22:</label>
        <input type="text" required maxLength="34" className="name22" />
        <label>Square 23:</label>
        <input type="text" required maxLength="34" className="name23" />
        <label>Square 24:</label>
        <input type="text" required maxLength="34" className="name24" />
        <button>Submit</button>
      </form>
    </div>
)};

// TODO conditionally render square [12] to remain static as FREE square

// TODO post-MVP add '*' create new and 'edit' button 19-PWA > 01 > 26-Stu_Manifest.


export default Create;