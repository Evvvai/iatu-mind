import { SearchVarious } from '../types'
import { GET_ALL_DISCIPLINES, GET_ALL_TEACHER, GET_ALL_USERS } from '../graphql/queries'

export const searchVariousData = {
  [SearchVarious.TASKS]: { ql: GET_ALL_USERS, term: 'disciplines' }, // need rework
  [SearchVarious.TEACHERS]: { ql: GET_ALL_TEACHER, term: 'disciplines' },
  [SearchVarious.DISCIPLINES]: { ql: GET_ALL_DISCIPLINES, term: 'disciplines' },
  [SearchVarious.USERS]: { ql: GET_ALL_USERS, term: 'disciplines' },
  [SearchVarious.NONE]: { ql: GET_ALL_DISCIPLINES, term: 'disciplines' },
}
