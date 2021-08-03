import React from 'react'
import propTypes from 'prop-types'

export const Modal = ({children, header}) => {
    
    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50" style={{background: 'rgba(0,0,0,0.50)'}}>
            <div className="min-h-full min-h-full animate-zoomin">
                <div className="w-10/12 h-3/5 md:w-3/5 md:h-3/4 absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-xl font-ui shadow-xl" style={{maxWidth: '1140px'}}>
                    { header &&
                        <div className="p-10 border-b border-gray-50">
                            <h1 className="text-lg text-gray-600 tracking-wider capitalize font-bold">
                                {header}
                            </h1>
                        </div>
                    }
                    <div className="p-10 h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}


Modal.propTypes = {
    header: propTypes.string,
}

