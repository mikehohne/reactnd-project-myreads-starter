import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import Read from './read'
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

    const { books, results, query, maxResults } = this.state

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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
