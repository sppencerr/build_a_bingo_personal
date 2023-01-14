import { list } from "postcss";
import { useState } from "react";
import '../Bingo/Bingo.css'
import OmniList from "../components/OmniList";
import SubList from "../components/SubList";

function Button ({text}) {
    const [btnState, setBtnState] = useState(false);

    function handleClick(){
        setBtnState(btnState => !btnState);
    } 

    let toggleClassCheck = btnState ? ' active' : '';

    return (
        <button className={`btn${toggleClassCheck} hover:bg-creme min-w-full min-h-full text-xs sm:text-sm md:text-base`} onClick={handleClick}
        >{text}</button>
    )
};

export default Button;