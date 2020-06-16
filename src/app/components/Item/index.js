import React from 'react';
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import FavoriteButton from '../FavoriteButton';

function Item ({firstChild, secondChild, button, imgSrc, title, description, onclick, id, isFavorite}) {

    let history = useHistory();
    //console.log(id, isFavorite);
    const moveToMovie = () => {
        history.push(`/item/${id}`); //replace naudoti tik su jautriais duomenimis, tipo login, forgot password ir pan.
        //kitu naudoti push, nes issisaugo nauji keliai istorijoje ir gali back ir forward daryti.
    }

    let words = description.split(' ');
    let words2 = "";
    for (let i = 0; i < words.length; i++) {
        words2 += words[i] + " ";
        if (i === 10) {
            words2 += "...";
            break;
        }
    }
    return (
        <div className="Item">
            <Link to={ `/item/${id}` }>
                {/* { link duoda daugiau galimybiu, pvz, naudotis juo vien tik klaviatura, be peles. tiesiog divas nera interaktyvus } */}
                <div className={firstChild}>
                    <img src={imgSrc} />
                </div>
                <div className={secondChild}>
                    <a>{title}</a><br/>
                    <a>{words2}</a>
                </div>
            </Link>
            {/* <Button onclick={onclick} id={id} mode={isFavorite ? "outline" : "regular"}>{button}</Button> */}
            <FavoriteButton onclick={onclick} id={id}></FavoriteButton>
        </div>
    );
}

export default Item;