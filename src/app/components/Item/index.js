import React from 'react';
import Button from '../Button';

function Item ({firstChild, secondChild, button, imgSrc, title, description, onclick, id, isFavorite}) {


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
            <div className={firstChild}>
                <img src={imgSrc} />
            </div>
            <div className={secondChild}>
                <a>{title}</a><br/>
                <a>{words2}</a>
            </div>
            <Button onclick={onclick} id={id} mode={isFavorite ? "outline" : "regular"}>{button}</Button>
        </div>
    );
}

export default Item;