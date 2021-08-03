import React from 'react'

export const Nav = ({children, activeClass}) => {

    return(
        <li className={`text-md px-4 transition duration-200 hover:opacity-70 ${activeClass}`}>{children}</li>
    );
}