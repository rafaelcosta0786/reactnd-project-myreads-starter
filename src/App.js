import React from 'react'
import { Route, Link } from 'react-router-dom'

import Shelf from './Shelf'
import Search from './Search'

import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    result: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const shelves = this.group(books, 'shelf')
      this.setState(shelves)
    })
  }

  group = (books, key) => books.reduce((returnValue, current) => {
    (returnValue[current[key]] = returnValue[current[key]] || []).push(current)
    return returnValue
  }, {})

  search = (term) =>
    BooksAPI.search(term).then((books) => {
      let booksObj = Object.values(this.state).reduce((rVal, current) => rVal.concat(current), []).reduce((rVal, current) => {
        rVal[current.id] = current;
        return rVal;
      }, {})
      this.setState({
        result: (books || []).map((book) => {
          (booksObj[book.id] && (book.shelf = booksObj[book.id].shelf)) || (book.shelf = 'none')
          return book;
        })
      })
    })

  onChangeShelve = (book, shelf) =>
    BooksAPI.update(book, shelf).then((update) => {
      book.shelf !== shelf && this.setState((state) => ({
        [book.shelf]: (state[book.shelf] || []).filter((b) => b.id !== book.id),
        [shelf]: (state[shelf] || []).concat(((b) => { b.shelf = shelf; return b })(book))
      }))
    })

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads Labs</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf id="currentlyReading" name="Currently Reading" listBook={this.state.currentlyReading} onChangeShelve={this.onChangeShelve} />
                <Shelf id="wantToRead" name="Want to Read" listBook={this.state.wantToRead} onChangeShelve={this.onChangeShelve} />
                <Shelf id="read" name="Read" listBook={this.state.read} onChangeShelve={this.onChangeShelve} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><div className="book-add"></div></Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() =>
          <Search result={this.state.result} onChangeShelve={this.onChangeShelve} search={this.search} />
        } />
      </div>
    )
  }
}

export default BooksApp
