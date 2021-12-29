import { gql } from '@apollo/client'

export const GET_ALL_LECTURERS = gql`
  query {
    lecturers {
      id
      shortName
      fullName
    }
  }
`

export const GET_ONE_LECTURER = gql`
  query ($id: Int!) {
    lecturer(id: $id) {
      id
      shortName
      fullName
    }
  }
`
