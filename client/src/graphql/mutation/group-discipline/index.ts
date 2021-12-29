import { gql } from '@apollo/client'

export const CREATE_GROUP_DISCIPLINE = gql`
  mutation ($groupId: Int!, $periodId: Int!, $disciplineId: Int!, $finalTaskId: Int!, $isCourse: Boolean!) {
    createGroupDiscipline(
      input: {
        groupId: $groupId
        periodId: $periodId
        disciplineId: $disciplineId
        finalTaskId: $finalTaskId
        isCourse: $isCourse
      }
    ) {
      groupId
      disciplineId
      periodId
      finalTaskId
      isCourse
    }
  }
`

export const CREATE_GROUP_DISCIPLINE_LECTURE = gql`
  mutation ($lecturerId: Int!, $groupDisciplineId: Int!, $role: RoleLecturer!) {
    createDisciplineLecturer(input: { lecturerId: $lecturerId, groupDisciplineId: $groupDisciplineId, role: $role }) {
      role
      lecturer {
        id
        shortName
        fullName
      }
    }
  }
`

export const REMOVE_GROUP_DISCIPLINE_LECTURER = gql`
  mutation ($lecturerId: Int!, $groupDisciplineId: Int!, $role: RoleLecturer!) {
    removeDisciplineLecturer(input: { lecturerId: $lecturerId, groupDisciplineId: $groupDisciplineId, role: $role }) {
      role
      lecturer {
        id
        shortName
        fullName
      }
    }
  }
`
