import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const { onChangeShelve, info } = props;
  return (<li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" title={info.title} style={{
          width: 128, height: 188,
          backgroundImage: `url(${(info.imageLinks && info.imageLinks.thumbnail)})`
        }}>
          {info.maturityRating &&
            <div className={'book-' + info.maturityRating}>
              {info.maturityRating === "NOT_MATURE" ? "Not Mature" : "Mature"}
            </div>}
        </div>
        <div className="book-shelf-changer">
          <select value={info.shelf} onChange={(evt) => {
            onChangeShelve(info, evt.target.value)
          }}>
            {info.shelf === 'none' ?
              <option value="none" disabled>Move to...</option> :
              <option value="none">None</option>}
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>

          </select>
        </div>
      </div>
      <div className="book-title" title={info.title}>
        {info.title}
      </div>
      {info.authors && info.authors.map((author) =>
        <div key={author} className="book-authors">{author}</div>
      )}
      {info.pageCount &&
        <div className="book-authors">{info.pageCount} pages</div>
      }
    </div>
  </li>)
}

Book.propTypes = {
  onChangeShelve: PropTypes.func.isRequired
}
export default Book;
