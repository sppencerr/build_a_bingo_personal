import { list } from "postcss";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../../utils/mutations';
import '../../Bingo/Bingo.css'


function CardSquareButton ({cardId, squareStatus, location, text}) {
    const [btnState, setBtnState] = useState(squareStatus);
    const [saveCard] = useMutation(UPDATE_CARD)

    async function handleClick(e) {
        e.preventDefault();
        const btnStatus = (e.target.dataset.squarestatus == 'false');
        setBtnState(btnState => !btnState);
        const updatedCard = await saveCard({
            variables: {
                cardId: cardId,
                square: {
                    location: location,
                    text: text,
                    status: btnStatus
                }
            }
        });
    } 

    let toggleClassCheck = btnState ? ' active' : '';
    squareStatus = btnState ? true : false;

    return (
        <button className={`btn${toggleClassCheck} hover:bg-creme min-w-full min-h-full text-xs sm:text-sm md:text-base`} onClick={handleClick}
            data-cardid={cardId} data-squarestatus={squareStatus} data-location={location}
        >{text}</button>
    )
};

export default CardSquareButton;