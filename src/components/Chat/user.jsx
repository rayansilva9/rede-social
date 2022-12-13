import { Avatar, Stack } from '@mui/material'

const UserChat = ({photo, username }) => {
  return (
    <>
      <Stack
        width="100vw"
        direction="row"
        spacing="20px"
        alignItems="center"
        sx={{ bgcolor: 'lightpink', p: '5px 5px' }}
      >
        <Avatar src={photo} />
        <p>{username}</p>
      </Stack>
    </>
  )
}

export default UserChat
