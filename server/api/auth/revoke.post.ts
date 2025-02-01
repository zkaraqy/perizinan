export default defineEventHandler(async (event) => {
  deleteCookie(event, "accessToken")
  return true
})
