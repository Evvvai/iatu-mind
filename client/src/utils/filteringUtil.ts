import { Disciplines, Lecturer } from '@types'

export const filteringDisciplinesUtil = (disc: Disciplines[], term: string): Disciplines[] => {
  let result: Disciplines[] = JSON.parse(JSON.stringify(disc))

  return (result = result.filter((x) => {
    if (x.name.toLowerCase().indexOf(term.toLowerCase()) > -1) return true
  }))
}

export const filteringLecturersUtil = (lecturers: Lecturer[], term: string): Lecturer[] => {
  let result: Lecturer[] = JSON.parse(JSON.stringify(lecturers))

  return (result = result.filter((x) => {
    if (x.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1) return true
  }))
}
