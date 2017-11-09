import React from 'react'
import './App.css'


class CurrentlyReading extends React.Component {
    render() {
      const { books, updateShelf, selectValue } = this.props
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
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
                        <select value={selectValue}>
                          <option value="none" disabled>Move to...</option>
                          {/* shelves */}
                          <option value={book.shelf}>{book.shelf.toUpperCase()}</option>
                          <option value="wantToRead">Want to Read</option>
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

export default CurrentlyReading