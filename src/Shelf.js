import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

const Shelf = (props) => {
  const { listBook, onChangeShelve, id, name } = props;

  return (
    <div key={id} className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {listBook && listBook.map((book) => {
            return <Book key={book.id} info={book} onChangeShelve={onChangeShelve} />
          }
          )}
        </ol>
      </div>
    </div>
  );
};


Shelf.propTypes = {
  listBook: PropTypes.array,
  onChangeShelve: PropTypes.func.isRequired
}


export default Shelf
