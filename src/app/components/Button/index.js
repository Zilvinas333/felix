import React from 'react';

function Button ({children, onclick, id, mode}) {

    //  const changeButton = event => {
    //     //console.log(event.target.value);
    //     console.log("veikia");
    // }
    let modeClass = mode === "outline" ? "btn-outline btn" : "btn"; 
    return (

            <button className={modeClass} id={id} onClick={onclick}>{children}</button>

    );
}

export default Button;