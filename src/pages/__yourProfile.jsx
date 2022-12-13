// import { Avatar, Box, IconButton, Typography } from '@mui/material'
// import { useContext, useEffect, useMemo, useState } from 'react'
// import useUser from '../hooks/use-User'
// // import { DeletPhoto } from '../services/firebase'
// import PostsFromProfilePage from '../components/profile/posts'
// import { useNavigate } from 'react-router-dom'
// // import * as ROUTES from '../routes/routes'
// import useAuthListener from '../hooks/use-auth-listener'
// import FirebaseContext from '../context/firebase'
// import { ThemeContext } from '../context/theme'
// import { Stack } from '@mui/system'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination } from 'swiper'
// import 'swiper/css'
// import 'swiper/css/bundle'
// import { v4 as uuidv4 } from 'uuid'
// import { arr } from '../utils/arr'
// import { BsHeartFill } from 'react-icons/bs'
// import { FaCommentAlt } from 'react-icons/fa'
// import { RiSendPlaneFill } from 'react-icons/ri'

// export default function YourProfilePage() {
//   const {
//     user: { username, fullname, photo, followers, following, bio }
//   } = useUser()

//   const { uid: userId } = JSON.parse(localStorage.getItem('authUser'))
//   const { darkMode } = useContext(ThemeContext)

//   // const navigate = useNavigate()
//   const { firebase } = useContext(FirebaseContext)

//   const [posts, setPosts] = useState([])
//   const [postId, setPostId] = useState('')
//   const [postToView, setPostToView] = useState(arr)

//   useMemo(() => {
//     async function getPostViewById() {
//       const result = await firebase
//         .firestore()
//         .collection('photos')
//         .where('postId', '==', postId)
//         .get()
//       const [post] = result.docs.map(res => res.data())
//       setPostToView(post)
//     }
//     getPostViewById()
//   }, [postId])

//   async function getMedia() {
//     const result = await firebase
//       .firestore()
//       .collection('photos')
//       .where('userId', '==', userId)
//       .get()

//     const media = result.docs.map(res => res.data())
//     setPosts(media)
//   }

//   useEffect(() => {
//     getMedia()
//   }, [])

//   const [open, setOpen] = useState(false)
//   const handleOpen = () => {
//     setOpen(true)
//   }
//   const handleClose = () => {
//     setOpen(false), setPostToView(arr)
//     console.log(open)
//   }

//   return (
//     <>
//       {!open ? null : !postToView ? null : (
//         <Box
//           key={uuidv4()}
//           sx={{
//             position: 'fixed',
//             width: '100vw',
//             height: '100vh',
//             bgcolor: '#000000b4',
//             zIndex: 999,
//             backdropFilter: 'blur(2px)'
//           }}
//         >
//           <p onClick={handleClose}>fechar</p>

//           <Box
//             id="modal_posts"
//             sx={{
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '95vw',
//               height: '600px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               gap: '2rem',
//               bgcolor: '#ffffffee',
//               // backdropFilter: 'blur(10px)',
//               border: '2px solid #000',
//               boxShadow: 24,
//               borderTopRightRadius: '30px',
//               borderBottomRightRadius: '30px,'
//             }}
//           >
//             <Swiper
//               onClick={() => {
//                 handleOpen, setPostId(e.postId)
//               }}
//               modules={[Navigation, Pagination]}
//               pagination={{ clickable: true }}
//               navigation
//               slidesPerView={1}
//               style={{ height: 'auto', flex: 1 }}
//             >
//               {postToView.media.map(e => (
//                 <SwiperSlide
//                   key={uuidv4()}
//                   style={{ display: 'flex', alignItems: 'center' }}
//                 >
//                   <PostsFromProfilePage
//                     src={e.src}
//                     type={e.type}
//                     theme={darkMode}
//                     toView={true}
//                     size={{
//                       border: '3px solid black',
//                       // minWidth: '400px',
//                       maxWidth: ' 100%'
//                       // maxHeight: '500px'
//                     }}
//                     size2width={'auto'}
//                     size2height={'700px'}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <Box
//               sx={{
//                 width: '600px',
//                 height: '100%',
//                 // bgcolor: 'blue',
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               <Stack
//                 direction="row"
//                 spacing="1rem"
//                 alignItems="center"
//                 p=".5rem 0"
//                 width="70%"
//               >
//                 <Avatar src={postToView.profileAvatar} />
//                 <Typography fontSize="1.3rem" fontWeight="bold" variant="p">
//                   {postToView.name}
//                 </Typography>
//                 <Typography fontSize="1.3rem" fontWeight="bold" variant="p">
//                   {postToView.caption}
//                 </Typography>
//               </Stack>
//               <Stack
//                 sx={{
//                   // border: '2px green solid',
//                   width: '80%',
//                   height: '100%',
//                   p: '1.3rem 1rem',
//                   gap: '1rem',
//                   overflowY: 'scroll',
//                   bgcolor: '#959595'
//                 }}
//               >
//                 {postToView.comments.map(e => (
//                   <Stack
//                     key={uuidv4()}
//                     direction="row"
//                     spacing="1rem"
//                     alignItems="flex-start"
//                     width="100%"
//                   >
//                     <Stack>
//                       <Avatar src={e.avatar} />
//                     </Stack>
//                     <Typography fontSize="1.3rem" fontWeight="bold" variant="p">
//                       {e.username}
//                       <Typography
//                         ml="1rem"
//                         fontSize="1.3rem"
//                         fontWeight="100"
//                         variant="p"
//                         sx={{ wordBreak: 'break-all' }}
//                       >
//                         {e.comment}
//                       </Typography>
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Stack>
//               <Stack
//                 direction="row"
//                 width="100%"
//                 alignItems="center"
//                 justifyContent="left"
//                 spacing="2rem"
//                 p="1rem 0 "
//               >
//                 <Box
//                   onClick={() => {
//                     // handleToggleLiked(toggleLiked)
//                   }}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '10px',
//                     alignItems: 'center'
//                   }}
//                 >
//                   <IconButton
//                     className="fromDarkTheme"
//                     sx={{
//                       display: !darkMode ? 'none' : 'flex',
//                       color: '' ? 'red' : 'grey',
//                       p: 0,
//                       transition: '0.2s all linear',
//                       scale: '' ? '1.1' : '.0'
//                     }}
//                   >
//                     <BsHeartFill />
//                   </IconButton>
//                   <IconButton
//                     className="fromLightTheme"
//                     sx={{
//                       display: !darkMode ? 'flex' : 'none',
//                       color: '' ? 'red' : 'black',
//                       p: '0',
//                       transition: '.1s all linear',
//                       fontSize: '1.4rem'
//                     }}
//                   >
//                     <BsHeartFill />
//                   </IconButton>
//                   <p style={{ color: !darkMode ? 'black' : 'white' }}>
//                     {postToView.likes.length}
//                   </p>
//                 </Box>
//                 <Box
//                   // onClick={handleFocus}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '10px',
//                     alignItems: 'center'
//                     // color: !darkMode ? 'black' : 'white'
//                   }}
//                 >
//                   <IconButton
//                     sx={{
//                       p: 0,
//                       fontSize: '1.4rem',
//                       color: !darkMode ? 'black' : 'grey'
//                     }}
//                   >
//                     <FaCommentAlt />
//                   </IconButton>
//                   <Typography color={!darkMode ? 'black' : 'white'} variant="p">
//                     {postToView.comments.length}
//                   </Typography>
//                 </Box>
//                 <Box
//                   // onClick={handleFocus}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '10px',
//                     alignItems: 'center'
//                   }}
//                 >
//                   <IconButton
//                     sx={{
//                       p: 0,
//                       fontSize: '1.6rem',
//                       color: !darkMode ? 'black' : 'grey'
//                     }}
//                   >
//                     <RiSendPlaneFill />
//                   </IconButton>
//                 </Box>
//               </Stack>
//             </Box>
//           </Box>
//         </Box>
//       )}
//       <Stack
//         minHeight="500px"
//         direction="column"
//         sx={{
//           position: 'sticky',
//           width: { xs: '100vw', sm: 'calc(100vw - 20vw)' },
//           ml: { xs: 0, sm: '20vw' },
//           pt: '20px',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1,
//           bgcolor: !darkMode ? 'white' : 'black',
//           color: !darkMode ? 'black' : 'white'
//         }}
//       >
//         <Stack
//           spacing=".4rem"
//           direction="column"
//           alignItems="center"
//           bgcolor={!darkMode ? 'white' : 'black'}
//         >
//           <img
//             src={photo}
//             style={{
//               width: '7.4rem',
//               height: '7.4rem',
//               borderRadius: '50%',
//               border: '3px solid #00ff88',
//               padding: '2px'
//             }}
//           />
//           <Typography
//             fontSize={{ xs: '2.4rem', sm: '3rem' }}
//             fontWeight="400"
//             variant="h4"
//           >
//             {username}
//           </Typography>
//           <Typography
//             textAlign="center"
//             fontSize={{ xs: '1.1rem', sm: '1.3rem' }}
//             fontWeight="300"
//             variant="p"
//           >
//             {bio}
//           </Typography>
//         </Stack>
//         <Stack
//           bgcolor={!darkMode ? 'white' : 'black'}
//           margin="2rem auto"
//           maxWidth={{ xs: '100vw', sm: '400px' }}
//           justifyContent="space-around"
//           alignItems="center"
//           direction="row"
//           spacing={{ xs: '3rem' }}
//         >
//           <Stack
//             alignItems="center"
//             color={!darkMode ? 'black' : 'white'}
//             bgcolor={!darkMode ? 'white' : 'black'}
//           >
//             <Typography fontSize="1rem" fontWeight="bold" variant="h4">
//               {!following ? null : following.length === 1 ? 0 : following.length - 1}
//             </Typography>
//             <Typography fontSize="1rem" fontWeight="bold" variant="h4">
//               Seguindo
//             </Typography>
//           </Stack>
//           <Stack alignItems="center">
//             <Typography fontSize="1rem" fontWeight="bold" variant="p">
//               {followers ? followers.length : 0}
//             </Typography>
//             <Typography fontSize="1rem" fontWeight="bold" variant="h4">
//               Seguidores
//             </Typography>
//           </Stack>
//           <Stack alignItems="center">
//             <Typography fontSize="1rem" fontWeight="bold" variant="p">
//               {posts && posts.length}
//             </Typography>
//             <Typography fontSize="1rem" fontWeight="bold" variant="h4">
//               Publicações
//             </Typography>
//           </Stack>
//         </Stack>
//         <button
//           style={{
//             width: '10rem',
//             height: '30px',
//             margin: '0 auto',
//             borderRadius: '20px',
//             border: 'none',
//             color: 'white',
//             background:
//               'linear-gradient(90deg, rgba(6,83,0,1) 0%, rgba(0,255,136,1) 100%)'
//           }}
//         >
//           Seguir
//         </button>
//       </Stack>
//       <Stack
//         bgcolor={!darkMode ? 'white' : 'black'}
//         width={{ xs: '100vw', sm: '600px', md: '100vw' }}
//         direction="row"
//         alignItems="center"
//         justifyContent="center"
//         flexWrap="wrap"
//         sx={{
//           rowGap: '3rem',
//           columnGap: '3rem',
//           m: '0 auto',
//           width: { xs: '100vw', sm: 'calc(100vw - 20vw)' },
//           ml: { xs: 0, sm: '20vw' },
//           position: 'relative',
//           zIndex: 5,
//           pt: '5rem',
//           pb: '7rem',
//           borderTopLeftRadius: ' 30px',
//           borderTopRightRadius: '30px',
//           boxShadow: !darkMode
//             ? '0px -67px 131px 0px rgba(0,0,0,0.47)'
//             : '0px -67px 131px 0px #e3e3e315'
//         }}
//       >
//         {posts.map(e => (
//           <Box key={uuidv4()}>
//             <Box sx={{ width: '400px', height: '400px' }}>
//               <Swiper
//                 onClick={() => {
//                   if (window.innerWidth > 600) {
//                     handleOpen(), setPostId(e.postId)
//                   }
//                 }}
//                 modules={[Navigation, Pagination]}
//                 pagination={{ clickable: true }}
//                 navigation
//                 slidesPerView={1}
//                 style={{ height: '100%', width: 'auto', margin: '0 auto' }}
//               >
//                 {' '}
//                 {e.media.map(e => (
//                   <>
//                     <div>
//                       <SwiperSlide key={uuidv4()} style={{ margin: '0 auto' }}>
//                         <PostsFromProfilePage
//                           src={e.src}
//                           type={e.type}
//                           theme={darkMode}
//                           toView={false}
//                           size={{
//                             minWidth: '400px',
//                             maxWidth: '500px',
//                             maxHeight: '400px'
//                           }}
//                         />
//                       </SwiperSlide>
//                     </div>
//                   </>
//                 ))}
//               </Swiper>
//             </Box>
//           </Box>
//         ))}
//       </Stack>
//     </>
//   )
// }
