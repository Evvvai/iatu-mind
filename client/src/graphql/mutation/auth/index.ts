import { gql } from '@apollo/client'

export const SIGNUP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $login: String!
    $password: String!
    $rePassword: String!
  ) {
    signUp(
      input: {
        firstName: $firstName
        lastName: $lastName
        login: $login
        email: $email
        password: $password
        rePassword: $rePassword
      }
    ) {
      user {
        id
      }
    }
  }
`

export const SIGNIN = gql`
  mutation ($login: String!, $password: String!) {
    signIn(input: { login: $login, password: $password }) {
      token
      user {
        id
        login
        password
        dateReg
        lastLogin
        role
      }
    }
  }
`

export const AUTH = gql`
  mutation {
    auth {
      token
      user {
        id
        login
        dateReg
        lastLogin
        role
      }
    }
  }
`
