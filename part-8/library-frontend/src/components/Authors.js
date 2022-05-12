import {useMutation, useQuery} from '@apollo/client'
import { useState } from 'react';
import { EDIT_AUTHOR } from '../graphql/mutations.js';
import { ALL_AUTHORS } from '../graphql/queries.js';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries : [{query : ALL_AUTHORS}]
  });
  const authors = useQuery(ALL_AUTHORS) ;
  
  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading</div>
  }
  
   const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({variables : {name , setBornTo : Number(born)}})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
         <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Born  
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
     
      
        <button type="submit">Update author</button>
      </form>
      </div>
    </div>
  )
}

export default Authors
