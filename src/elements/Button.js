import React from 'react'
import propTypes from "prop-types";

export const Button = ({onClick, Rounded, type, children, className}) => {
    
    const handleClick = () => {
        if (!onClick) return;
        onClick();
    }

    const classes = ["transition duration-200 focus:outline-none", className || ''];

    Rounded ? classes.push('rounded-full') : classes.push('rounded-sm');

    if (type === "primary") {
        classes.push('bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary-light text-gray-50');
    } else if(type === "secondary"){
        classes.push('bg-secondary hover:bg-secondary-dark focus:ring-2 focus:ring-red-300 text-gray-50');
    } else{
        classes.push('bg-white border border-primary-light text-gray-400 hover:bg-gray-200');
    }
    
    return(
        <button onClick={handleClick} className={classes.join(' ').trim()}>{children}</button>
    );
}

Button.propTypes = {
    onClick: propTypes.func,
    Rounded: propTypes.bool,
    type: propTypes.string,
    className: propTypes.string
}