import React, { useState } from 'react';
import propTypes from 'prop-types';
import { SearchIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router';

export const SearchInput = ({hasIcon, isRounded, isWide, placeholder, className}) => {
    
    const [keyword, setKeyword] = useState('');
    const searchView = useHistory();
    const classes = ['relative md:border border-gray-400 border-opacity-40', className];

    if (isWide) classes.push('w-full');
    else classes.push('md:w-1/5');

    if (isRounded) classes.push('rounded-full');
    else classes.push('rounded-sm');


    const handleClickSearch = () => {
        if (keyword.trim() === '') return;
        searchView.push(`/search/${keyword}`);
        setKeyword('');
    }

    const handleEnterSearch = (e) => {
        if (e.key !== "Enter") return;
        if (keyword.trim() === '') return;
        searchView.push(`/search/${keyword.split(" ").join("-").toLowerCase()}`);
        setKeyword('');
    }

    const handleInput = (e) => {
        const value = e.target.value;
        setKeyword(value);
    }

    return(
        <>
        <div className={classes.join(' ')}>
            <input onChange={handleInput} onKeyUp={handleEnterSearch} type="text" value={keyword} className={`w-full h-full bg-transparent placeholder-gray-400 placeholder-opacity-70 outline-none pl-5 text-sm sm:text-base tracking-wide text-gray-500 transition duration-300 font-ui focus:ring-2 focus:ring-green-100 ${isRounded ? 'rounded-full' : 'rounded-sm'}`} placeholder={placeholder} />
            {
                hasIcon ?
                <SearchIcon className="w-7 h-7 text-gray-400 absolute right-0 top-1/2 transform -translate-x-3 -translate-y-1/2" />
                : ''
            }
        </div>
        </>
    );
    
}


SearchInput.propTypes = {
    isWide: propTypes.bool,
    hasButton: propTypes.bool,
    placeholder: propTypes.string
}