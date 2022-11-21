import PropTypes from 'prop-types'
import { useState } from 'react'
import { formatDistance } from 'date-fns'
import AddComment from './add-comment'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function PostComments({
  docId,
  comments: allComments,
  posted,
  commentInput
}) {
  const [comments, setComments] = useState(allComments)
  const [open, setOpen] = useState(1)

  return (
    <>
      <Box
        sx={{
          p: '0 10px',
          maxHeight: '230px',
          overflow: 'scroll',
          bgcolor: '#c1c1c161',
          borderRadius: '10px',
          '&::-webkit-scrollbar': {
            width: '5px',
            bgcolor: '#c1c1c161'
          },
          '&::-webkit-scrollbar-button': {
            display: 'none'
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#9090909d',
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar-track-piece': {
            bgcolor: '#c1c1c161',
            borderRadius: '10px'
          }
        }}
      >
        {comments.slice(0, open).map(item => (
          <Box
            key={item.displayName + item.comment}
            sx={{
              m: '5px 0',
              ml: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  variant="subtitle1"
                  key={`${item.comments}-${item.displayName}`}
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  {item.displayName}{' '}
                  <span>
                    <Typography
                      sx={{
                        fontWeight: '300',
                        wordBreak: 'break-all'
                      }}
                      variant=""
                    >
                      {item.comment}
                    </Typography>
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {comments.length >= 2 && (
        <Typography
          m="5px 0"
          fontSize={13}
          color="#6b6b6bd0"
          onClick={() => {
            open <= 1 ? setOpen(comments.length) : setOpen(1)
          }}
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            ml: '3px'
          }}
        >
          {open <= 1 ? `Ver todos os ${comments.length} comentarios` : 'Ver menos'}
        </Typography>
      )}

      <AddComment
        docId={docId}
        commentInput={commentInput}
        setComments={setComments}
        comments={comments}
      />
      <Typography fontSize="10px">{formatDistance(posted, new Date())} ago</Typography>
    </>
  )
}

PostComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
}
