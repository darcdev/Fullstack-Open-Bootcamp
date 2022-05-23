import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../graphql/queries.js';

const Books = (props) => {

  const booksCategories = useQuery(ALL_BOOKS);
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [actualBooks, setActualBooks] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (booksCategories.data) {
      const genresMap = new Set();
      const allBooks = booksCategories.data.allBooks;
      allBooks.map(book => book.genres.map(genre => genresMap.add(genre)));
      setGenres([...genresMap])
    }
    getBooks();
  }, [booksCategories.data]) //eslint-disable-line

  useEffect(() => {
    if (books.data) {
      setActualBooks(books.data.allBooks);
    }
    getBooks({ variables: { genre } })
  }, [genre, books.data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  const handleChangeGenre = (event) => {
    const genre = event.target.value;
    setGenre(genre);
  }

  if (books.loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <p>Filtrar Libros por:</p>
        <select defaultValue={genre} onChange={handleChangeGenre}>
          <option value={""}>all genres</option>
          {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {actualBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
