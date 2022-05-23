import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react';
import { ALL_BOOKS, ME } from '../graphql/queries.js';

const Recommended = (props) => {

  const { data: user } = useQuery(ME, { variables: { username: props.user } })
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getBooks({ variables: { genre: user?.me?.favoriteGenre } })
  }, [user]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <b>{user.me.favoriteGenre}</b>
      </div>

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

export default Recommended
