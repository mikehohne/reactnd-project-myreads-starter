import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import Read from './read'
import Search from './search'


import PropType from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortby from 'sortby'


class BooksApp extends React.Component {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

  state = {
    books: [],
    query: '',
    maxResults: 10,
    results: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  searchForTerms = (query,maxResults) => {
    BooksAPI.search(query,maxResults)
      .then((results) => {
        if(results.error) {
          console.error('Invalid Search Term');
        }
        this.setState({
          results: results,
      })
    })
  }

  render() {

    const { books, results, query, maxResults, showSearchPage } = this.state

    let currentlyReadings = []
    let reads = []
    let wantToReads = []
  
    books.map((book => {
      if(book.shelf === 'read'){
        reads.push(book);
      } else if(book.shelf === 'wantToRead'){
        wantToReads.push(book);
      } else if(book.shelf === 'currentlyReading') {
        currentlyReadings.push(book);
      } else {
      return `<div>No Shelves</div>`
      }
    }))


    return (
      <div className="app">
          <Route path="/search" exact render={() => (
            <Search />
          )} />
          <Route path="/" exact render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>Bookshelf App</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading books={currentlyReadings} />
                <WantToRead books={wantToReads} />
                <Read books={reads} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
