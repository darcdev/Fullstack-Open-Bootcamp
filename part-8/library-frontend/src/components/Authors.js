import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react';
import { EDIT_AUTHOR } from '../graphql/mutations.js';
import { ALL_AUTHORS } from '../graphql/queries.js';
import Select from 'react-select';

const Authors = (props) => {
  const [value, setValue] = useState('');
  const [born, setBorn] = useState('');
  const authors = useQuery(ALL_AUTHORS);
  const options = authors.data && authors.data.allAuthors.map(author => ({ value: author.name, label: author.name }))

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: value.value, setBornTo: Number(born) } })

    setValue('');
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
      {props.token && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              Name
              <Select
                value={value}
                onChange={(selectedOption) => setValue(selectedOption)}
                options={options}

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
      )}
    </div>
  )
}

export default Authors
