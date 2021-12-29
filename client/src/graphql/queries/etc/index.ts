import { gql } from '@apollo/client'

export const GET_ALL_GROUPS = gql`
  query {
    groups {
      id
      name
    }
  }
`

export const GET_ALL_PERIODS = gql`
  query {
    periods {
      id
      year
      half
    }
  }
`

// Not implemented
export const GET_ALL_TEACHER = gql`
  query ($groupId: Int!, $dateFirst: DateTime!, $dateLast: DateTime!) {
    scheduleTicketsWeek(input: { groupId: $groupId, dateFirst: $dateFirst, dateLast: $dateLast }) {
      id
      text
      dateAdd
    }
  }
`
// Not implemented
export const GET_ALL_USERS = gql`
  query ($groupId: Int!, $dateFirst: DateTime!, $dateLast: DateTime!) {
    scheduleTicketsWeek(input: { groupId: $groupId, dateFirst: $dateFirst, dateLast: $dateLast }) {
      id
      text
      dateAdd
    }
  }
`
