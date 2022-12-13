import {
  Button,
  IconButton,
  Input,
  LinearProgress,
  Modal,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { ThemeContext } from '../context/theme'
import useUser from '../hooks/use-User'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'
import { firebase, FieldValue, storage, db } from '../lib/firebase'
import useElementOnScreen from '../hooks/elementOnScreen'

const NewPostPage = () => {
  const [files, setFiles] = useState([])
  const [previewFiles, setPreviewFiles] = useState([])
  const [urls, setUrls] = useState([])
  const [desc, setDesc] = useState('')
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }

  const {
    user: { username, fullname, photo, followers, following, bio, userId }
  } = useUser()

  function handleFilePreview(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader()
      let item = e.target.files[i]
      console.log(item)
      reader.readAsDataURL(item)
      reader.onloadend = readerEvent => {
        let src = readerEvent.target.result
        setPreviewFiles(old => [...old, src])
      }
    }
  }

  function handleFile(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i]
      newImage['id'] = Math.random()
      setFiles(prevState => [...prevState, newImage])
    }
  }

  async function handlePost() {
    const date = new Date()
    const promises = []
    let DOC_ID

    await firebase
      .firestore()
      .collection('photos')
      .add({
        caption: desc ? desc : '',
        name: username,
        userId: userId,
        dateCreated: date[Symbol.toPrimitive]('number'),
        comments: [],
        likes: []
      })
      .then(doc => {
        firebase
          .firestore()
          .collection('photos')
          .doc(doc.id)
          .set({ docPostId: doc.id }, { merge: true })
        DOC_ID = doc.id
      })

    files.map(file => {
      const uploadTask = storage.ref(`postagems/${file.name}`).put(file)
      promises.push(uploadTask)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        async () => {
          await storage
            .ref('postagems')
            .child(file.name)
            .getDownloadURL()
            .then(urls => {
              console.log(urls)
              firebase
                .firestore()
                .collection('photos')
                .doc(DOC_ID)
                .set(
                  {
                    media: FieldValue.arrayUnion({ src: urls, type: file.type })
                  },
                  { merge: true }
                )
            })
          setUrls(prevState => [...prevState, urls])
        }
      )
    })

    Promise.all(promises)
      .then(() => {
        console.log('All images uploaded'), handleDeleteFile()
        setProgress(0), handleClose()
      })
      .catch(err => console.log(err))
  }

  const handleDeleteFile = () => {
    setFiles([])
    setPreviewFiles([])
    setDesc('')
  }

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const isVisibile = useElementOnScreen(options, videoRef)

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(!playing)
    } else {
      videoRef.current.play()
      setPlaying(!playing)
    }
  }

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play()
        setPlaying(true)
      }
    } else {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
  }, [isVisibile])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000000',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography color="white" variant="body2">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {!open ? null : (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography>Enviando...</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
              </Box>
            </Box>
          </Modal>
        </div>
      )}
      <Box
        sx={{
          width: { xs: '100vw', sm: 'calc(100vw - 20vw)' },
          ml: { xs: 0, sm: '20vw' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          pb: '80px',
          pl: { xs: 0, sm: '2rem' },
          bgcolor: !darkMode ? '#cdd3d9' : '#010101'
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            p: '20px 0px',
            borderRadius: '2px',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: ' 20px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: !darkMode ? '#cdd3d9' : 'black',
            width: '100%',
            minHeight: '80vh'
          }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            slidesPerView={1}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            {' '}
            {previewFiles.map(e => (
              <SwiperSlide
                key={e}
                style={{
                  width: '100vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <video
                  style={{
                    display: e.includes('image') ? 'none' : 'inline'
                  }}
                  // ref={videoRef}
                  // onClick={() => {
                  //   onVideoClick()
                  // }}
                  loop
                  controls
                  src={e}
                  height="400px"
                  width="100%"
                />
                <img
                  style={{
                    display: e.includes('video') ? 'none' : 'inline'
                  }}
                  src={e}
                  height="400px"
                  width=" 400px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Input
            sx={{
              width: '100%',
              p: '0 5px',
              bgcolor: !darkMode ? '' : 'white',
              borderRadius: '10px'
            }}
            value={desc}
            onChange={e => {
              setDesc(e.target.value)
            }}
            placeholder="Adicione uma descrição"
          />
          <Box
            sx={{
              bgcolor: '',
              border: '2px dashed white',
              display: files && !files.length ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
              width: '90%'
            }}
          >
            <Button
              size="large"
              variant={!darkMode ? 'contained' : 'outlined'}
              component="label"
            >
              Selecionar do aparelho
              <input
                onChange={e => {
                  handleFile(e), handleFilePreview(e)
                }}
                hidden
                accept="*"
                multiple
                type="file"
              />
            </Button>
          </Box>
          <Stack direction="row" spacing={20}>
            <Button
              onClick={() => {
                handlePost(), handleOpen()
              }}
              variant="outlined"
              sx={{
                display: !files.length ? 'none' : 'inline'
              }}
            >
              Postar
            </Button>
            <IconButton
              onClick={handleDeleteFile}
              variant="outlined"
              color="error"
              sx={{
                display: !files.length ? 'none' : 'inline',
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
    </>
  )
}

export default NewPostPage
