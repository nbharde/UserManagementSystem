const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const path = require('path')

const server = jsonServer.create()

const userdb = JSON.parse(fs.readFileSync(path.join(__dirname, 'app/api/users.json'), 'UTF-8'))
const router = jsonServer.router(path.join(__dirname, 'app/api/users.json'))

server.use(jsonServer.defaults())
server.use(bodyParser.json()) // for parsing application/json

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function getUserRole({ username, password }) {
    return userdb.users.find(user => user.username === username && user.password === password).role;
}

server.post('/auth/login', (req, res) => {
    const { username, password } = req.body
    if (isAuthenticated({ username, password }) === false) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({ status, message })
        return
    }
    const token = createToken({ username, password })
    res.status(200).json({ token, user: username, success: true, role: getUserRole({ username, password }) })
})


server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined) {
        const status = 401
        const message = 'Bad authorization header'
        res.status(status).json({ status, message })
        return
    }
    try {
        verifyToken(req.headers.authorization)
        next()
    } catch (err) {
        const status = 401
        const message = 'Error: access_token is not valid'
        res.status(status).json({ status, message })
    }
})

server.use(router)

server.listen(3000, () => {
    console.log('Run Auth API Server')
})

server.use('/api', router);
