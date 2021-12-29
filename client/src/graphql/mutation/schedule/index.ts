import { gql } from '@apollo/client'

export const CREATE_SCHEDULE_TICKET = gql`
  mutation ($groupId: Int!, $dateAdd: DateTime!, $text: String!) {
    createScheduleTickets(input: { groupId: $groupId, dateAdd: $dateAdd, text: $text }) {
      id
    }
  }
`
