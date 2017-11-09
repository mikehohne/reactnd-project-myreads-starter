import React from 'react'

class SearchList extends React.Component {
    render() {

        const { results } = this.props
        return (
            <div>
                {results.map((result) => (
                    <li key={result.id}>
                        {result.title}
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    {/* dropdown */}
                                    <select>
                                        <option value="none" disabled>Move to...</option>
                                        {/* shelves */}
                                        <option value="NONE"></option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            {/* title */}
                            <div className="book-title">{result.title}</div>
                            {/* author */}
                            {result.authors.map((author) => (
                                <div key={author} className="book-authors">{author}</div>
                            ))}
                        </div>
                    </li>
                ))}
            </div>
        )
    }
}

export default SearchList