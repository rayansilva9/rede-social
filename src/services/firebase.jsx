import { useState } from 'react'
import { firebase, FieldValue, storage } from '../lib/firebase'

//VERIFICA SE TEM UM USERNAME EXISTENTE

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.map(user => user.data().length > 0)
}

// RETORNA DOCUMENTO COM DADOS DO USUARIO LOGADO COM BASE NA SUA ID

export async function getUserById(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))

  return user
}

// RETORNA USUARIOS PARA O COMPONENTE [ SUGESTION ]

export async function getSuggestedProfile(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get()
  return result.docs
    .map(user => ({ ...user.data(), docId: user.id }))
    .filter(profile => profile.userId !== userId && !following.includes(profile.userId))
}

// ATUALIZA DOCUMENTO ADICIONANDO OU REMOVENDO O SEGUIDOR

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    })
}

export async function updateLoggedInUserFollowers(
  profileDocId,
  userId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId)
    })
}

// RETORNA AS FOTOS COM BASE EM QUEM O USUARIO SEGUE

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()

  const userFollowedPhotos = result.docs.map(photo => ({
    ...photo.data(),
    docId: photo.id
  }))

  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async photo => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }
      const user = await getUserById(photo.userId)
      const { username } = user[0]
      return { username, ...photo, userLikedPhoto }
    })
  )
  return photoWithUserDetails
}

// RETORNA A ATUAL FOTO DE PERFIL DO USUARIO AO POST

export async function avatarUser(userId, photoId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', photoId)
    .get()

  const [postAvatar] = result.docs.map(doc => doc.data().photo)

  return postAvatar
}

export async function getPhotosByDocumentTitle(username) {
  const [activeDocUser, setActiveDocUser] = useState({})
  const [activePhotosUser, setActivePhotosUser] = useState({})

  const result_a = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const [docAnotherUser] = result_a.docs.map(doc => doc.data())
  const [b] = result_a.docs.map(doc => doc.data().userId)

  // setActiveDocUser(docAnotherUser)

  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', b)
    .get()

  const PhotosAnotherUser = result.docs.map(item => item.data().imageSrc)

  return { docAnotherUser, PhotosAnotherUser }
}

export async function uploadPost(desc, name, postId, userId, dateCreated, file) {
  await firebase
    .firestore()
    .collection('photos')
    .add({
      caption: desc,
      name: name,
      postId: postId,
      userId: userId,
      dateCreated: dateCreated,
      comments: [],
      likes: []
    })
    .then(doc => {
      const upload = storage.ref(`posts/${doc.id}`).putString(file, 'data_url')

      upload.on(
        'state_change',
        null,
        err => console.log(err),
        () => {
          storage
            .ref('posts')
            .child(doc.id)
            .getDownloadURL()
            .then(file => {
              firebase.firestore().collection('photos').doc(doc.id).set(
                {
                  imageSrc: file
                },
                { merge: true }
              )
            })
        }
      )
    })
}
