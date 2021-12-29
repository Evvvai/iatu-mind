import { PairType } from '../types'

import { ReactComponent as LectureC } from '../utils/img/Lecture.svg'
import { ReactComponent as PracticeC } from '../utils/img/Practic.svg'
import { ReactComponent as LaboratornC } from '../utils/img/Laba.svg'

export const pairTypeVariousIcon = {
  [PairType.LECTURE]: LectureC,
  [PairType.PRACTICE]: PracticeC,
  [PairType.LABORATORN]: LaboratornC,
}
