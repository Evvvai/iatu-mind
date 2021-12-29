import { gql } from '@apollo/client'

export const GET_TICKETS_WEEK_BETWEEN = gql`
  query ($groupId: Int!, $dateFirst: DateTime!, $dateLast: DateTime!) {
    scheduleTicketsWeek(input: { groupId: $groupId, dateFirst: $dateFirst, dateLast: $dateLast }) {
      id
      text
      dateAdd
    }
  }
`
