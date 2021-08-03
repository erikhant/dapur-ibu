import React from 'react';
import propTypes from 'prop-types';
import Grid from './Grid';

const Card = ({children, Bordered, hasShadow, isRounded, overFlow, horizontal, cols, className }) => {
    const classes = [className || ''];

    if (Bordered) classes.push("border border-gray-200 hover:border-gray-300");
    if (hasShadow) classes.push("shadow");
    if (overFlow) classes.push("overflow-hidden");
    if(isRounded) classes.push("rounded-lg");

    return(
        horizontal ?
        (<div className={classes.join(" ")}>
            <Grid cols={cols || 1}>
                {children}
            </Grid>
        </div>)
            :
        (<div className={classes.join(" ")}>
            {children}
        </div>)
    );

}

Card.propTypes = {
    Bordered: propTypes.bool,
    hasShadow: propTypes.bool,
    overFlow: propTypes.bool,
    horizontal: propTypes.bool,
    cols: propTypes.number
}

export default Card;