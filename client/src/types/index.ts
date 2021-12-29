// =======================================================================================
// Store

// =======================================================================================
// App
// =======================================================================================

export interface AppState {
  isLoad: boolean
  isAsideOpen: boolean
  isGroupSelectorOpen: boolean
  isEdit: boolean

  groups: Group[]
  groupNow: Group

  periods: Period[]
  periodNow: Period

  error: {
    info: any | null
    isActive: boolean
  }

  location: Location[]
}

export interface Location {
  original: string
  value: string
  path: string
}

// =======================================================================================
// Schedule
// =======================================================================================

export interface ScheduleState {
  isLoading: boolean
  error: string | null

  daySkip: number

  nowPair: Schedule[]
  nextPair: Schedule[]

  schedule: Schedule[]
  tickets: Ticket[]
}

// =======================================================================================
// User
// =======================================================================================

export interface UserState {
  isLoggedIn: boolean
  user: User
  error: any
}

export interface User {
  id: number
  login: string
  password?: string
  dateReg: Date
  lastLogin: Date
  role: string
}

export enum Role {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

// =======================================================================================
// User
// =======================================================================================

export interface SearchSuggestion {
  id: number
  image: string
  name: string
}

export enum SearchVarious {
  NONE = 'none',
  TASKS = 'Задания',
  USERS = 'Пользователи',
  DISCIPLINES = 'Предметы',
  TEACHERS = 'Преподаватели',
}

export interface SearchState {
  term: string
  suggestion: SearchSuggestion[]
  various: SearchVarious
  isLoading: boolean
  isVisible: boolean
}

// =======================================================================================
// Discipline
// =======================================================================================

export interface DisciplineState {
  isDisciplineLoad: boolean
  isDisciplineExtendLoad: boolean
  isLoading: boolean
  notFound: boolean
  disciplines: GroupDisciplinesList[]
  disciplineExtended: DisciplineExtended
  activeSection: DisciplineSection
}

export interface GroupDisciplinesList extends GroupDisciplines {
  taskCount?: number
  lybraryCount?: number
  lastUpdate?: Date
}

export interface DisciplineExtended {
  id: number
  groupId: number
  disciplineId: number
  periodId: number
  discipline: {
    id: number
    name: string
    description: string
    actually: boolean
  }
  finalTask: {
    id: number
    name: string
  }
  isCourse: boolean
  disciplineLecturer: [DisciplineLecturer]
  disciplineTasks: [DisciplineTask]
}

export interface DisciplineLecturer {
  role: 'LECTURE' | 'PRACTICE' | 'LABORATORN'
  lecturer: Lecturer
}

export enum DisciplineSection {
  OVERVIEW = 'OVERVIEW',
  TASK = 'TASK',
  LIBRARY = 'LIBRARY',
}

export interface DisciplineTask {
  taskStatus?: DisciplineTaskStatus
  id: number
  index: number
  groupDisciplineId: number
  title: string
  description: string
  fullDescription: string
  endTime: Date
  createdAt: Date
  updatedAt: Date
  authorId: number
  author: {
    id: number
    login: string
  }
}

export interface DisciplineTaskStatus {
  id: number | null
  disciplineTaskId: number
  status: 'COMPLETE' | 'NONE'
  userId: number | null
  updatedAt: number | null
}

export enum TaskStatus {
  COMPLETE = 'Выполнена',
  NONE = 'Не выполнена',
}

// =======================================================================================
// Root
// =======================================================================================

// export interface RootState {
//   appState: AppState
//   scheduleState: ScheduleState
// }

// =======================================================================================

// =======================================================================================
// Different types
// =======================================================================================

export interface Schedule {
  timeWait?: number
  date: string | Date
  timeStart: string
  timeStop: string
  discipline: string
  cabinet: string
  teacher: string
  type: string
  subgroup: string
}

export interface Ticket {
  id: number
  text: string
  dateAdd: Date // Not released
}

export interface Group {
  id: number
  name: string
}

export interface Period {
  id: number
  year: Date
  half: number
}

export interface SignUpQL {
  firstName: string
  lastName: string
  email: string
  login: string
  password: string
  rePassword: string
}

export interface SignInQL {
  login: string
  password: string
}

export interface Disciplines {
  id: number
  name: string
}

export interface GroupDisciplines {
  id: number
  groupId: number
  disciplineId: number
  discipline: Disciplines
  disciplineTasks: DisciplineTask[]
  // period?: Period
  // group?: Group
}

export interface SearchBar {
  isOpen: boolean
  various: number
  term: string
}

export interface Lecturer {
  id: number
  shortName: string
  fullName: string
}

export enum PairType {
  LECTURE = 'Лекция',
  PRACTICE = 'Практика',
  LABORATORN = 'Лабораторные',
}
