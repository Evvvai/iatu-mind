import { gql } from '@apollo/client'

export const GET_AVAILABLE_DISCIPLINES = gql`
  query ($groupId: Int!, $periodId: Int!) {
    disciplinesAvailable(disciplineInput: { groupId: $groupId, periodId: $periodId }) {
      id
      name
    }
  }
`

export const GET_ALL_DISCIPLINES = gql`
  query ($term: String!) {
    disciplines(input: { term: $term }) {
      id
      name
    }
  }
`
