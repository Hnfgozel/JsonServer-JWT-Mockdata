const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Payloaddan token oluşturuldu
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Token Doğrulama
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Kullanıcı giriş yaptı mı
function isLoginAuthenticated({username, password  }) {
    return userdb.users.findIndex(user => user.username === username && user.password === password ) !== -1
}
// Kullancı veritabanında var mı?
function isRegisterAuthenticated({username, email, password  }) {
    return userdb.users.findIndex(user => user.username === username && user.email === email && user.password === password ) !== -1
}


// Yeni kullanıcı kayıt
server.post('/auth/register', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { email, password, username } = req.body;

    if (isRegisterAuthenticated({ email, password, username }) === true) {
        const status = 401;
        const message = 'Email and Password already exist';
        res.status(status).json({ status, message });
        return
    }

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Var olan kullanıcıların verilerini al
        var data = JSON.parse(data.toString());

        // Son kullanıcının id değerini al
        var last_item_id = data.users[data.users.length - 1].id;

        // Yeni kullanıcı ekle
        data.users.push({ id: last_item_id + 1, email: email, password: password, username: username }); //değer ekle
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // Üzerine yaz
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });

    // Yeni kullanıcı için token oluştur
    const access_token = createToken({ email, password, username })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

// users.json klsaöründeki kullanıcıların biri ile giriş yap
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { username, password } = req.body;
    if (isLoginAuthenticated({ username, password }) === false) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({ status, message })
        return
    }
    const access_token = createToken({ username, password  })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({ status, message })
        return
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401
            const message = 'Access token not provided'
            res.status(status).json({ status, message })
            return
        }
        next()
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({ status, message })
    }
})

// const data = {
//     books: [],
//     profile: {}
//   };
  
//   data.books = _.range(0, 10).map((num) => ({
//     id: faker.datatype.uuid(),
//     name: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     category: num % 2 === 0 ? "scifi" : "fantasy",
//     subcategory: num % 2 !== 0 ? "novel" : "story",
//   }));
  

server.use(router)

const port = 4000;
server.listen(port, () => {
    console.log('Run Auth API Server is running on ' + port)
})
