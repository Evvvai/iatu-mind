import { gql } from '@apollo/client'

export const GET_EXIST_DISCIPLINES = gql`
  query ($groupId: Int, $periodId: Int) {
    getExistDisciplines(input: { groupId: $groupId, periodId: $periodId }) {
      id
      groupId
      disciplineId
      discipline {
        id
        name
      }
      disciplineTasks {
        id
        title
        createdAt
        updatedAt
        authorId
        author {
          id
          login
        }
      }
    }
  }
`

export const GET_EXIST_DISCIPLINES_AUTH = gql`
  query ($groupId: Int, $periodId: Int, $userId: Int!) {
    getExistDisciplines(input: { groupId: $groupId, periodId: $periodId }) {
      id
      groupId
      disciplineId
      discipline {
        id
        name
      }
      disciplineTasks {
        id
        title
        createdAt
        updatedAt
        authorId
        author {
          id
          login
        }
        taskStatus(userId: $userId) {
          id
          status
          userId
          disciplineTaskId
          updatedAt
        }
      }
    }
  }
`

export const GET_EXTEND_DISCIPLINES = gql`
  query ($groupId: Int, $periodId: Int, $disciplineId: Int) {
    getExtendDiscipline(input: { groupId: $groupId, periodId: $periodId, disciplineId: $disciplineId }) {
      id
      groupId
      disciplineId
      periodId
      discipline {
        id
        name
        description
        actually
      }
      finalTask {
        id
        name
      }
      isCourse
      disciplineLecturer {
        role
        lecturer {
          id
          shortName
          fullName
        }
      }
      disciplineTasks {
        id
        index
        title
        description
        fullDescription
        endTime
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_EXTEND_DISCIPLINES_AUTH = gql`
  query ($groupId: Int, $periodId: Int, $disciplineId: Int, $userId: Int!) {
    getExtendDiscipline(input: { groupId: $groupId, periodId: $periodId, disciplineId: $disciplineId }) {
      id
      groupId
      disciplineId
      periodId
      discipline {
        id
        name
        description
        actually
      }
      finalTask {
        id
        name
      }
      isCourse
      disciplineLecturer {
        role
        lecturer {
          id
          shortName
          fullName
        }
      }
      disciplineTasks {
        taskStatus(userId: $userId) {
          id
          status
          userId
          updatedAt
        }
        id
        index
        title
        description
        fullDescription
        endTime
        createdAt
        updatedAt
      }
    }
  }
`
