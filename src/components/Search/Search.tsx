import React from 'react';
import './Search.scss';

const Search: React.FC<{ value: string, output: any }> = ({ value, output }) => {
    const reset = () => {
        value = ""
    }

    return (
        <form className="navSearch">
            <label ><i className="material-icons tile-icon">search</i></label>
            <input type="text" className="noLine" onChange={output} placeholder={value} onBlur={reset} />
        </form>
    )
};

export default Search;