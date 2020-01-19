import React, { RefObject } from 'react';

const Search: React.FC<{ output: any }> = ({ output }) => {

    let searchInput: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    const reset = () => {
        return searchInput.current ? searchInput.current.value = "" : null;
    }

    return (
        <form className="navSearch">
            <label ><i className="material-icons tile-icon">search</i></label>
            <input type="text" className="noLine" ref={searchInput} onChange={output} onBlur={reset} />
        </form>
    )
};

export default Search;