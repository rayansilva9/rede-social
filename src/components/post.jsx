import { Box, Divider, Paper, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import GetPhotoProfilePost from '../hooks/getPhotosProfilePost'
import { avatarUser, checkedUser } from '../services/firebase'
import PostActions from './Post/actions'
import PostComments from './Post/comments'
import PostFooter from './Post/footer'
import PostHeader from './Post/header'
import PostImage from './Post/image'

export default function Post({ content }) {
  const commentInput = useRef(null)
  const HandleFocus = () => commentInput.current.focus()
  const [activePicProfile, setActivePicProfile] = useState()
  const [checked, setChecked] = useState(false)

  const i = GetPhotoProfilePost(content.photoId, content.userId).then(res =>
    setActivePicProfile(res)
  )
  const j = checkedUser(content.photoId, content.userId).then(res => {
    setChecked(res)
  })
  useEffect(() => {
    i
  }, [content.comments])

  return (
    <Paper
      elevation={0}
      sx={{
        background: '',
        width: { xs: '100vw', sm: '450px', md: '500px' },
        p: '10px 0px',
        borderRadius: '20px',
        mb: '20px'
      }}
    >
      <PostHeader
        photo={activePicProfile}
        userName={content.username}
        checked={checked}
      />
      <PostImage src={content.imageSrc} />
      <PostActions
        handleFocus={HandleFocus}
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        totalComments={content.comments.length}
      />
      <PostFooter username={content.username} caption={content.caption} />
      <PostComments
        postId={content.docId}
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </Paper>
  )
}

Post.propType = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
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
