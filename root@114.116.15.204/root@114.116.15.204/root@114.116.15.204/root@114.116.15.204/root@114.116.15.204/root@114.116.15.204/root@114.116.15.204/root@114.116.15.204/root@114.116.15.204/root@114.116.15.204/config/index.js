const {env} = process

module.exports = {
  host:env.HOST,
  port:env.PORT,
  jwtSecret:env.JWT_SECRET,
  wxAppId:env.APP_ID,
  wxSecret:env.APP_SECRET
}