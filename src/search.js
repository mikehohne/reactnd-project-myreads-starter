import React from 'react'
import { Link } from 'react-router-dom'
import SearchList from './searchList'

class Search extends React.Component {

  state = {
    query: '',
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }
  
   render() {
    
      const { onSearch, maxResults, searchedBooks } = this.props
      const { query } = this.state

        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} onChange={this.handleChange} placeholder="Search by title or author" />
                <button className="btn" onClick={() => onSearch(query, maxResults) }>Search</button>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <SearchList results={searchedBooks} />
              </ol>
            </div>
          </div>
        )
    }
}

export default Search