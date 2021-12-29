import { FC } from 'react'

import NotFound from '../NotFound/NotFound'

interface Props {
  match: any
  location: any
}

const Profile: FC<Props> = (props) => {
  return <NotFound />

  return (
    <section>
      <div>asdasdasdasda</div>
      {/* <div>{props?.match}</div> */}
    </section>
  )
}

export default Profile
