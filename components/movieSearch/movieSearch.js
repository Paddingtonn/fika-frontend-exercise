import './movieSearch.css';

import React from 'react';

const Search = ({ hanldeEvent }) => {

  return(
    <div className='search_container'>
      <input placeholder='Search movie' onKeyUp={(e)=> hanldeEvent(e)}></input>
    </div>
  );
}

export default Search;