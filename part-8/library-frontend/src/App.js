import { useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_BOOKS } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscription.js';
import { updateCache } from './utils/updateCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState('');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const bookAdded = useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })


  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('login');
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
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

      <Recommended user={user} show={page === 'recommended'} />

      <Login setPage={setPage} setToken={setToken} setUser={setUser} show={page === 'login'} />

    </div>
  )
}

export default App
