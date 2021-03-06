import React from 'react'
import PropTypes from 'prop-types'


class WantToRead extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  render() {
    const { books } = this.props
      return (
          <div className="bookshelf">
          <h2 className="bookshelf-title">Want To Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {/* image thumbnail */}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      {/* dropdown */}
                      <select>
                        <option value="none" disabled>Move To</option>
                        {/* shelves */}
                        <option value={book.shelf}>{book.shelf.toUpperCase()}</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  {/* title */}
                  <div className="book-title">{book.title}</div>
                  {/* author */}
                  {book.authors.map((author) => (
                   <div key={author} className="book-authors">{author}</div>
                  ))}
                </div>
              </li>
              ))}
            </ol>
          </div>
        </div>
      )
  }
}

export default WantToRead