import { avatarUser } from '../services/firebase'

async function GetPhotoProfilePost(userId, photoId) {
  const a = await avatarUser(userId, photoId)
  return a
}

export default GetPhotoProfilePost
