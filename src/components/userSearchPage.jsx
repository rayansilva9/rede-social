import { Avatar, Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/use-User'
import {
  atualizar_meu_doc_quem_eu_sigo,
  atualizar_meu_doc_quem_vou_seguir
} from '../services/firebase'
import * as ROUTES from '../routes/routes'

const UserSearchPage = ({
  Setphoto,
  Setusername,
  Setfullname,
  TargetDocId,
  TargetId
}) => {
  const {
    user: { userId, following, docId }
  } = useUser()

  const navigate = useNavigate()

  const [isfollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (following && following.includes(TargetId)) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  })

  async function handleFollowedUser() {
    await atualizar_meu_doc_quem_eu_sigo(docId, TargetId, isfollowing)
    await atualizar_meu_doc_quem_vou_seguir(TargetDocId, userId, isfollowing)
    if (following && following.includes(TargetId)) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  }
  return (
    <Box
      onClick={() => {
        navigate(`${ROUTES.PROFILE}/${Setusername}`)
      }}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        height: '80px',
        bgcolor: '#c9c9c9cd',
        borderRadius: '30px',
        p: '5px 10px',
        gap: '20px'
      }}
    >
      <Avatar src={Setphoto} sx={{ width: '60px', height: '60px' }} />
      <Box sx={{}}>
        <Typography fontWeight="600">{`@${Setusername}`}</Typography>
        <Typography>{Setfullname}</Typography>
      </Box>
      <Button
        disabled={isfollowing ? true : false}
        onClick={() => {
          handleFollowedUser()
        }}
        sx={{
          position: 'absolute',
          right: '10px',
          display: ''
        }}
      >
        {!isfollowing ? 'Seguir' : 'Seguindo'}
      </Button>
    </Box>
  )
}

export default UserSearchPage
