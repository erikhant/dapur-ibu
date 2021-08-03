import React from 'react'
import propTypes from "prop-types";

const Grid = ({ cols, rows, children, className }) => {

    const clGrid = `grid-cols-${cols}`
    const rowGrid = rows ? `grid-rows-${rows}` : ''

    return(
        <div className={`grid ${clGrid.trim()} ${rowGrid.trim()} overflow-hidden ${className || ''}`}>
            { children }
        </div>
    );
    
}

Grid.propTypes = {
    cols : propTypes.number,
}

export default Grid;
