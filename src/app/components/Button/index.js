import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";

function Button ({children, onclick, id, favorites, toggleFavorite}) {

    return (

            <button className="btn" onClick={ onclick }>{children}</button>

    );
}

export default Button;