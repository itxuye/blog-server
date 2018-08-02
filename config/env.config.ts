//Web Environment 
const isProdEnv: boolean = process.env.NODE_ENV === 'production'

//Development Env Config
//listen port
let listenPort: Number = 3000

if (isProdEnv) {
    //listen port
    listenPort = 3000
}


export default {
    listenPort
}