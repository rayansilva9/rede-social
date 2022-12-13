import { getUserProviderInfo } from '../services/firebase'

async function GetPhotoProfilePost(userId, photoId) {
  const userInfo = await getUserProviderInfo(userId, photoId)
  return userInfo
}

export default GetPhotoProfilePost
