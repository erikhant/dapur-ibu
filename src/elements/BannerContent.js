import React from 'react'
import propTypes from "prop-types";

const BannerContent = ({
    title, 
    text, 
    colSpan, 
    className, 
    children,
    isSide,
    style
}) => {

    const clSpan = `col-span-${colSpan || 1} ${isSide ? `md:col-span-${colSpan + 1} lg:col-span-${colSpan}`: ''}`;
    const titleStyle = { 
                        style: { textShadow: `${title && title.textShadow ? '0 1px 3px rgba(0,0,0,0.27)' : '0 0 0 rgba(0,0,0,0)'}`},
                        className: title && `font-bold capitalize z-10 ${ title.size || 'text-2xl lg:text-4xl'} ${title.color || 'text-gray-800'} ${title.position || 'relative'} ${title.margin || ''} ${title.padding || ''}`
                    }
                    
    return(
        <div className={clSpan}>
            <div className={`${className || ''}`} style={style}> 
                { title && <h1 {...titleStyle} >{title.caption}</h1>}
                { text && <p className={`text-md lg:text-base ${text.color || 'text-gray-800' } relative z-10 ${text.margin || ''} ${text.padding || ''}`}>{ text.caption } </p>}
                { children }
            </div>
        </div>
    );
}

BannerContent.propTypes = {
    title : propTypes.object,
    text : propTypes.object,
    className : propTypes.string,
    colSpan : propTypes.number
}


export default BannerContent;