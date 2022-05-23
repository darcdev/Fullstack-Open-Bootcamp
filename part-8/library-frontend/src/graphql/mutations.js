import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
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
export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name,
            born
        }
    }
`
export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username : $username, password: $password) {
          value
        }
    }
`