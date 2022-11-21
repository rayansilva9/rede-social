import { Button, Input, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useRef, useState } from 'react'
import useUser from '../hooks/use-User'
import { uploadPost } from '../services/firebase'

const NewPostPage = () => {
  const [file, setFile] = useState()
  const [desc, setDesc] = useState()

  const date = new Date();

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
    }
    else {
      console.log("error")
    }
  }

  const handleDeleteFile = () => setFile(null)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        mt: '10px',
        ml: { sm: '135px', xs: 0 }
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#c9c9c9',
          width: '95%',
          height: '90vh'
        }}
      >
        <Input
          onChange={e => {
            setDesc(e.target.value)
          }}
          placeholder="Descrição"
        />
        {file && (
          <img
            style={{
              width: '350px',
              height: '500px'
            }}
            src={file}
          />
        )}

        <Button
          sx={{
            display: file ? 'none' : 'inline'
          }}
          variant="contained"
          component="label"
        >
          Upload
          <input onChange={handleFile} hidden accept="image/*" type="file" />
        </Button>
        <Button
          onClick={handlePost}
          variant="contained"
          color="success"
          sx={{
            display: file ? 'inline' : 'none'
          }}
        >
          Enviar
        </Button>
        <Button
          onClick={handleDeleteFile}
          variant="outlined"
          color="error"
          sx={{
            display: file ? 'inline' : 'none'
          }}
        >
          Deletar
        </Button>
      </Paper>
    </Box>
  )
}

export default NewPostPage
