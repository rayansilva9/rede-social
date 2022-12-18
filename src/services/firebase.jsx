import { firebase, FieldValue, storage, db, deleteDoc } from '../lib/firebase'

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

export async function getUserProviderInfo(userId, itemId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', itemId)
    .get()

  const [userProviderInfo] = result.docs.map(doc => ({
    username: doc.data().username,
    photo: doc.data().photo,
    checked: doc.data().checked,
    userId: doc.data().userId
  }))

  return userProviderInfo
}

// RETORNA SE O USUARIO E VERIFICADO OU NÃO

export async function checkedUser(userId, photoId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const [checked] = result.docs.map(doc => doc.data().checked)

  return checked
}

//  DELETAR FOTO

export const DeletPhoto = docId => {
  db.collection('photos').doc(docId).delete()
}

// export async function deleteComment(postId) {
//   return firebase.firestore().collection('photos').doc(postId).update({
//     comments:
//   })
// }

// RETORNA USUARIOS NA SEARCH

export const getUserSearch = async setUsername => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', setUsername)
    .get()

  const [allUsers] = result.docs.map(doc => ({
    ...doc.data()
  }))
  // , doc.data().fullname, doc.data().photo)
  // console.log(allUsers)

  return allUsers
}
export const deleteComment = async (docPostId, docId) => {
  db.collection('photos').doc(docPostId).collection('comentarios').doc(docId).delete()
}
export const deleteVidsComment = async (docPostId, docId) => {
  db.collection('vids').doc(docPostId).collection('comentarios').doc(docId).delete()
}
export const getComments = async (collection, docPostId) => {
  const result = firebase
    .firestore()
    .collection(collection)
    .doc(docPostId)
    .collection('comentarios')
    .get()

  const comentarios = (await result).docs.map(doc => doc.data())

  return comentarios
}
export const getVidsComments = async docPostId => {
  const result = firebase
    .firestore()
    .collection('vids')
    .doc(docPostId)
    .collection('comentarios')
    .get()

  const comentarios = (await result).docs.map(doc => doc.data())
  console.log(comentarios)

  return comentarios
}

export async function atualizar_meu_doc_quem_eu_sigo(
  MeuDocId,
  Target_Id,
  isFollowingTarget
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(MeuDocId)
    .update({
      following: isFollowingTarget
        ? FieldValue.arrayRemove(Target_Id)
        : FieldValue.arrayUnion(Target_Id)
    })
}

export async function atualizar_meu_doc_quem_vou_seguir(
  Target_DocId,
  MeuId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(Target_DocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(MeuId)
        : FieldValue.arrayUnion(MeuId)
    })
}

export const getPostViewById = async postId => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('postId', '==', postId)
    .get()

  const result2 = result.docs.map(doc => ({
    ...doc.data()
  }))
  const post = result2
  console.log(post)

  return post
}
