import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query AllAuthors {
      allAuthors {
        name
        born
        bookCount
        id
      }
  } 
`
export const ALL_BOOKS = gql`
query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    id
    title
    published
    genres
    author {
      name
    }
  }
}
`
export const ME = gql`
 query Me($username: String!) {
  me(username: $username) {
    favoriteGenre
  }
}  
`