import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class Shelf extends React.Component {
  static propTypes = {
    listBook: PropTypes.array,
    onChangeShelve: PropTypes.func.isRequired
  }

  render() {
    const { listBook, onChangeShelve, id, name } = this.props;

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
  }
}

export default Shelf
