import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types';

const Search = (props) => {
  return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(event)=> props.search(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {props.result && props.result.map((book)=>
              <Book key={book.id} info={book} onChangeShelve={props.onChangeShelve}/>
            )}
          </ol>
        </div>
      </div>
      );
};

Search.propTypes = {
  result: PropTypes.array,
  onChangeShelve: PropTypes.func.isRequired
}
export default Search
