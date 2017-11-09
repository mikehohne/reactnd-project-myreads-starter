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

class BooksApp extends React.Component {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks(query, maxResults) {
    BooksAPI.search(query, maxResults).then((searchResults) => {
      console.log(searchResults);
      this.setState({ searchResults })
    })
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }



  render() {

    const { books, searchResults } = this.state

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
      } 
      return `<div>No Shelves</div>`
      
    }))


    return (
      <div className="app">
          <Route path="/search" exact render={() => (
            <Search searchedBooks={searchResults} onSearch={(query,maxResults) => {
              this.searchBooks(query,maxResults)
            }} />
          )} />
          <Route path="/" exact render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>Bookshelf App</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading books={currentlyReadings}  />
                <WantToRead books={wantToReads} />
                <Read books={reads} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
