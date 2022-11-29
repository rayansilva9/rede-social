import { Button, IconButton, Input, Paper, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import useUser from '../hooks/use-User'
import { uploadPost } from '../services/firebase'

const NewPostPage = () => {
  const [file, setFile] = useState()
  const [desc, setDesc] = useState()

  const date = new Date()

  const {
    user: { username, fullname, photo, followers, following, bio, userId }
  } = useUser()

  const handleFile = e => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = readerEvent => {
      setFile(readerEvent.target.result)
    }
  }

  const handlePost = () => {
    if (desc && file) {
      uploadPost(desc, username, 10, userId, date[Symbol.toPrimitive]('number'), file)
      setDesc('')
    } else {
      console.log('error')
    }
  }

  const imgRef = useRef(null)
  const handleDeleteFile = () => {
    setFile(null), (imgRef.current.src = '')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        pb: '80px',
        // ml: { sm: '135px', xs: 0 },
        bgcolor: '#cdd3d9'
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          p: '20px 5px',
          borderRadius: '2px',
          borderBottomRightRadius: '20px',
          borderBottomLeftRadius: ' 20px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#cdd3d9',
          width: '95%',
          minHeight: '80vh'
        }}
      >
        {file && (
          <>
            <img
              ref={imgRef}
              style={{
                width: '100%',
                height: '500px'
              }}
              src={file}
            />
            <Input
              sx={{
                width: '100%',
                p:'0 5px',
              }}
              onChange={e => {
                setDesc(e.target.value)
              }}
              placeholder="Adicione uma descrição"
            />
          </>
        )}
        <Box
          sx={{
            bgcolor: '',
            border: '2px dashed white',
            display: file ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            width: '90%'
          }}
        >
          <Button size="large" variant="contained" component="label">
            Selecionar do aparelho
            <input onChange={handleFile} hidden accept="image/*" type="file" />
          </Button>
        </Box>
        <Stack direction="row" spacing={20}>
          <Button
            onClick={handlePost}
            variant="outlined"
            sx={{
              display: file ? 'inline' : 'none'
            }}
          >
            Postar
          </Button>
          <IconButton
            onClick={handleDeleteFile}
            variant="outlined"
            color="error"
            sx={{
              display: file ? 'inline' : 'none',
              height: '40px',
              width: '40px',
              p: 0,
              fontSize: '30px'
            }}
          >
            <MdDelete />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  )
}

export default NewPostPage
