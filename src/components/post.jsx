import GetPhotoProfilePost from '../hooks/getPhotosProfilePost'
import { ThemeContext } from '../context/theme'
import { useContext, useEffect, useState, useRef } from 'react'
import { checkedUser, getComments, getUserProviderInfo } from '../services/firebase'
import { Paper, Skeleton, Stack } from '@mui/material'
import PostHeader from './Post/header'
import PostImage from './Post/image'
import PostActions from './Post/actions'
import PostFooter from './Post/footer'
import PostComments from './Post/comments'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'
import useElementOnScreen from '../hooks/elementOnScreen'
import { useMemo } from 'react'
import { DoubleClick } from './clickHandle'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/userContext'
import useUser from '../hooks/use-User'

export default function Post({ content }) {
  const commentInput = useRef(null)
  const postRef = useRef(null)
  const HandleFocus = () => commentInput.current.focus()
  const [comments, setComments] = useState([])
  const [lazyLoad, setLazyLoad] = useState(true)
  const [userInfo, setUserInfo] = useState(true)

  useMemo(async () => {
    getUserProviderInfo(content.photoId, content.userId).then(res => setUserInfo(res))
    getComments(content.docPostId).then(res => setComments(res))
  }, [])

  const { darkMode } = useContext(ThemeContext)
  const media = content.media

  const options = {
    root: null,
    rootMargin: '500% 1px 500% 1px',
    threshold: 0
  }

  const isVisibile = useElementOnScreen(options, postRef)

  useEffect(() => {
    if (isVisibile) {
      setLazyLoad(true)
    } else {
      setLazyLoad(false)
    }
  }, [isVisibile])

  const {
    user: { userId }
  } = useUser()

  const { firebase, FieldValue } = useContext(FirebaseContext)

  const [toggleLiked, setToggleLiked] = useState(content.userLikedPhoto)
  const [likes, setlikes] = useState(content.likes.length)

  const handleToggleLiked = async () => {
    setToggleLiked(toggleLiked => !toggleLiked)

    await firebase
      .firestore()
      .collection('photos')
      .doc(content.docPostId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId)
      })

    setlikes(likes => (toggleLiked ? likes - 1 : likes + 1))
  }

  return (
    <Paper
      ref={postRef}
      elevation={0}
      sx={{
        background: !darkMode ? 'white' : 'black',
        width: { xs: '100vw', sm: '410px', md: '470px' },
        height: { xs: 'auto', sm: 'auto', md: 'auto' },
        borderRadius: '20px',
        mb: '20px',
        borderBottom: !darkMode ? '' : '1px solid #ffffff21',
        borderTop: !darkMode ? '' : '1px solid #ffffff21'
      }}
    >
      <PostHeader
        photo={userInfo.photo}
        userName={userInfo.username}
        checked={userInfo.checked}
        userId2={userInfo.userId}
      />
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
        onDoubleClick={handleToggleLiked}
        style={{
          height: '100%',
          minHeight: '564px'
        }}
      >
        {!lazyLoad ? (
          <>
            <Stack sx={{ p: '30px 0' }}>
              <Stack direction="row" spacing="10px" animation="wave">
                <Skeleton
                  variant="circular"
                  sx={{
                    width: '40px',
                    height: '40px',
                    bgcolor: !darkMode ? '' : '#bdbdbd5f'
                  }}
                />
                <Skeleton
                  variant="retangular"
                  animation="wave"
                  sx={{
                    flex: '1',
                    height: '40px',
                    bgcolor: !darkMode ? '' : '#bdbdbd5f'
                  }}
                />
              </Stack>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  m: '20px 0 ',
                  width: { xs: 370, sm: 450 },
                  height: 500,
                  bgcolor: !darkMode ? '' : '#bdbdbd5f'
                }}
              />
            </Stack>
          </>
        ) : (
          media.map(url => (
            <SwiperSlide
              key={url.src}
              style={{
                width: '100%',
                maxHeight: '564px',
                minHeight: '564px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                id="aquiii"
                // onClick={handleToggleLiked}
              >
                <PostImage src={url.src} type={url.type} theme={darkMode} />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <PostActions
        handleFocus={HandleFocus}
        docId={content.docId}
        totalLikes={likes}
        likedPhoto={toggleLiked}
        totalComments={comments.length}
      />
      <PostFooter username={content.username} caption={content.caption} />
      <PostComments
        postId={content.docId}
        docId={content.docPostId}
        comments={comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </Paper>
  )
}

Post.propType = {
  content: PropTypes.shape({
    userName: PropTypes.string,
    photo: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
}
