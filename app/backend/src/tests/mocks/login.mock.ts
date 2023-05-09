import User from "../../database/models/user.model"

const login = {
  email: "portezan@email.com",
  password: "1234567"
}

const loginInvalidPassword = {
  email: "portezan@admin.com",
  password: "123"
}

const loginIvalidEmail = {
  email: "portezan.com",
  password: "secret_admin"
}
const user = {
    id: 1,
    email: "portezan@email.com",
    username: "portezan",
    password: "12345678",
    role: "user"
  } as User

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjA1NTMyLCJleHAiOjE2ODAyMTI3MzJ9.fVR0a96xjJV-9ExRSgzq2rF0OAebO1gns2y2eGmYiJs'

export {login, loginInvalidPassword, loginIvalidEmail, tokenMock, user}