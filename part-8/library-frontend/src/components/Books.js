import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries.js';

const Books = (props) => {

  const books = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
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
