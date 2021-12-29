import { Schedule } from '../types'

const uniquePair = (schedule: Schedule[]) => {
  let unique: string[] = []
  schedule.forEach((item: any) => {
    if (unique.indexOf(item.timeStart?.toString()) === -1) {
      unique.push(item.timeStart?.toString())
      return true
    }
    return false
  })

  return unique
}

export default uniquePair
