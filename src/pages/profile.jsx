import { Box, Divider, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import ProfileAvatar from '../components/profile/ProfileAvatar'
import useUser from '../hooks/use-User'
import PropTypes from 'prop-types'
import ProfilePosts from '../components/profile/ProfilePosts'
import { getPhotosByDocumentTitle } from '../services/firebase'
import PostsFromProfilePage from '../components/profile/posts'
import { PreventContext } from '../context/prevent'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../routes'

export default function ProfilePage() {
  const navigate = useNavigate()

  const { PreventFunction, Prevent } = useContext(PreventContext)
  const a = document.title

  const [anotherUser, setAnotherUser] = useState({})
  const docUser = getPhotosByDocumentTitle(a).then(res => {
    setAnotherUser(res)
  })

  if (Prevent === false) {
    navigate(ROUTES.DASHBOARD)
  }

  const photos = anotherUser ? anotherUser.PhotosAnotherUser : ''
  const doc = anotherUser.docAnotherUser ? anotherUser.docAnotherUser : ''

  return (
    <Box
      sx={{
        bgcolor: '#f4f4f4',
        pl: { xs: 0, sm: '140px' },
        width: '100vw',
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        mb:'100px',
      }}
    >
      <Box
        sx={{
          p: { xs: 0, sm: '100px 200px' },
          mt: '0px',
          height: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '20px', sm: 0 },
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Box
          sx={{
            mt: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <ProfileAvatar ProfilePic={doc.photo} />
          <h1
            style={{
              fontWeight: '100'
            }}
          >
            {doc.username}
          </h1>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '200px',
              width: { xs: '100vw', sm: 'auto' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
                bgcolor: { xs: '#c1c1c1', sm: 'unset' },
                borderRadius: '10px',
                p: '10px 0'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  span: { fontWeight: '100' }
                }}
              >
                {photos ? photos.length : ''} 
                <span> Publicações</span>
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  span: { fontWeight: '100' }
                }}
              >
                {doc.followers ? doc.followers.length : ''} <span>Seguidores</span>
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  span: { fontWeight: '100' }
                }}
              >
                {doc.following ? doc.following.length : ''} <span>Seguindo</span>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              p: '10px'
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
              {doc.fullname}
            </Typography>
            <Typography sx={{ fontWeight: '100', fontSize: '16px' }}>
              {doc.bio}
            </Typography>
          </Box>
          <Divider sx={{ m: '10px 0' }} />
        </Box>
      </Box>
      <Box sx={{
        width: { xs: '100%', sm: '60%', md: '90%', },
        display: "flex",
        justifyContent:{xs: 'center', sm: 'unset',},
        gap: '10%',
        flexWrap: "wrap",
      }}>
        {photos &&
          photos.map(url => {
            return <PostsFromProfilePage key={url.id} imageSrc={url} />
          })}
      </Box>
    </Box>
  )
}
