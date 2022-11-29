import { Avatar, Stack } from '@mui/material'
import { Box } from '@mui/system'

const UserStories = () => {
  return (
    <div
      style={{
        border: '3px solid cyan',
        borderRadius: '50%',
      }}
    >
      <Avatar
        sx={{ height: '60px', width: '60px' }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_OFfTVd4FTVAFEFQTmwkNahMMH7Akk8apnA&usqp=CAU"
        alt=""
      />
    </div>
  )
}

export default UserStories
