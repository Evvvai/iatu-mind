import { gql } from '@apollo/client'

export const GET_DISCIPLINE_TASKS = gql`
  query ($groupDisciplineId: Int!) {
    disciplineTasks(groupDisciplineId: $groupDisciplineId) {
      id
      groupDisciplineId
      title
      description
      fullDescription
      endTime
      createdAt
      updatedAt
    }
  }
`
