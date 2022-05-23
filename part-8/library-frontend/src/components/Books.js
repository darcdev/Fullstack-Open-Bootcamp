import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../graphql/queries.js';

const Books = (props) => {

  const books = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (books.data) {
      console.log(books.data);
      const genresMap = new Set();
      const allBooks = books.data.allBooks;
      allBooks.map(book => book.genres.map(genre => genresMap.add(genre)));
      setGenres([...genresMap])
      setGenre('');
    }
  }, [books.data])

  if (!props.show) {
    return null
  }

  const handleChangeGenre = (event) => {
    const genre = event.target.value;
    const filterBooks = books.data.allBooks.filter(book => book.genres.includes(genre));
    setFilterBooks(filterBooks);
    setGenre(genre);
  }

  if (books.loading) {
    return <div>Loading</div>
  }

  const showBooks = !genre ? books.data.allBooks : filterBooks

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
          {showBooks.map((a) => (
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
