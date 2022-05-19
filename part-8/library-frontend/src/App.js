import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);

  const logout = () => {
    setToken(null);
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && (
          <button onClick={() => setPage('login')}>Login</button>
        )}
        {token && (
          <button onClick={logout}>Logout</button>
        )}

      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login setPage={setPage} setToken={setToken} show={page === 'login'} />

    </div>
  )
}

export default App
