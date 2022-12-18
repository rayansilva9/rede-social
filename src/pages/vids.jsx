import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'
import Vids from '../components/Vids/Vids'
import { Avatar, Box, Stack } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { VidsContext } from '../context/vidsCurrentContext'
import { useMemo } from 'react'
import { db } from '../lib/firebase'
import FirebaseContext from '../context/firebase'
import useUser from '../hooks/use-User'
import { MdVerified } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import {
  deleteComment,
  deleteVidsComment,
  getComments,
  getVidsComments
} from '../services/firebase'
import VidsCommentarios from '../components/Vids/VidsComments'
import { v4 as uuidv4 } from 'uuid'

const VidsPage = () => {
  const pathname = window.location.pathname

  var res = pathname.split('/')
  const {
    user: { following, username, userId }
  } = useUser()
  const { currentVid, setCurrentVid, openedComment, setOpenedComment } =
    useContext(VidsContext)
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const [vidsMedia, setvidsMedia] = useState([])
  const [url, setUrl] = useState('')
  const [newComment, setNewComment] = useState('')
  const [openItem, setOpenItem] = useState(false)

  const inputRef = useRef(null)

  const [comments, setComments] = useState([])

  const docIdPost = uuidv4().slice(0, 14)

  useEffect(() => {
    if (res.length > 2) {
      setUrl(res[2].slice(3, res[2].length))
    }
  }, [pathname])

  useMemo(() => {
    async function getVideos() {
      if (following) {
        const result = await firebase
          .firestore()
          .collection('vids')
          .where('userId', 'in', following)
          .get()
        const getVids = result.docs.map(doc => doc.data())
        setvidsMedia(getVids)
      }
    }
    getVideos()
  }, [following])

  const handleCloseComments = () => {
    setOpenedComment(false)
  }

  useMemo(() => {
    if (url) {
      getVidsComments(url).then(res => setComments(res))
    }
  }, [url])
  const docIdPost2 = uuidv4().slice(0, 14)

  function handleSubmitComment(e) {
    e.preventDefault()

    setComments(old => [...old, { comment: newComment, userId, url }])
    inputRef.current.value = ''

    db.collection('vids').doc(url).collection('comentarios').doc(docIdPost2).set({
      comment: newComment,
      docId: docIdPost2,
      name: username,
      userId: userId
    })
  }

  const handleDeleteComment = (index, CommentdocId) => {
    const i = [...comments]
    i.splice(index, 1)
    setComments(i)
    deleteVidsComment(url, CommentdocId)
    setOpenItem(false)
  }

  return (
    <>
      <Box sx={{ position: 'relative', overflowY: 'hidden', maxHeight: '100vh' }}>
        <Swiper
          modules={[A11y]}
          direction="vertical"
          slidesPerView={1}
          style={{ height: '100vh', width: 'auto' }}
        >
          {vidsMedia &&
            vidsMedia.map((e, index) => (
              <SwiperSlide key={e.id}>
                <Vids
                  url={e.media}
                  likes={e.likes.length}
                  comments={e.comments.length}
                  id={e.id}
                  docPostId={e.docPostId}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            bottom: openedComment ? '0' : '-100vh'
          }}
        >
          <Box
            onClick={handleCloseComments}
            sx={{
              flex: 1,
              zIndex: 10,

              bgcolor: 'transparent'
            }}
          ></Box>
          <Box
            sx={{
              zIndex: 10,
              width: '100%',
              height: '400px',
              bgcolor: 'white',
              p: '5px 10px'
            }}
          >
            {comments.map((e, index) => (
              <>
                <VidsCommentarios
                  comme={e.comment}
                  userId2={e.userId}
                  closeItem={openItem}
                  delet={() => {
                    handleDeleteComment(index, e.docId)
                  }}
                />
              </>
            ))}
            <Stack
              component="form"
              onSubmit={e => {
                inputRef.current.value.length >= 1
                  ? handleSubmitComment(e)
                  : e.preventDefault()
              }}
              noValidate
              direction="row"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%'
              }}
            >
              <input
                onChange={({ target }) => {
                  setNewComment(target.value)
                }}
                ref={inputRef}
                type="text"
                style={{
                  flex: 1,
                  height: '40px'
                }}
              />
              <button type="submit" style={{ width: '50px' }}>
                Enviar
              </button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default VidsPage
