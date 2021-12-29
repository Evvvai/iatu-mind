import { gql } from '@apollo/client'

export const CREATE_DISCIPLINE_TASK = gql`
  mutation ($groupDisciplineId: Int!, $title: String!, $description: String!, $authorId: Int!, $index: Int!) {
    createDisciplineTask(
      input: {
        groupDisciplineId: $groupDisciplineId
        title: $title
        description: $description
        authorId: $authorId
        index: $index
      }
    ) {
      id
      index
      groupDisciplineId
      taskStatus(userId: $authorId) {
        id
        status
        updatedAt
      }
      title
      description
      fullDescription
      endTime
      createdAt
      updatedAt
    }
  }
`

export const REMOVE_DISCIPLINE_TASK = gql`
  mutation ($id: Int!) {
    removeDisciplineTask(id: $id) {
      id
    }
  }
`

export const UPDATE_TASK_COMPLETE = gql`
  mutation ($status: TaskStatus!, $id: Int!) {
    updateTaskComplete(updateTaskCompleteInput: { id: $id, status: $status }) {
      id
      status
      userId
      disciplineTaskId
      updatedAt
    }
  }
`
export const CREATE_TASK_COMPLETE = gql`
  mutation ($status: TaskStatus!, $userId: Int!, $disciplineTaskId: Int!) {
    createTaskComplete(
      createTaskCompleteInput: { status: $status, userId: $userId, disciplineTaskId: $disciplineTaskId }
    ) {
      id
      status
      userId
      disciplineTaskId
      updatedAt
    }
  }
`
