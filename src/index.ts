import "reflect-metadata";
import * as Koa from 'koa'
import {createConnection} from "typeorm";
import { useKoaServer } from 'routing-controllers'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as helmet from 'koa-helmet'

createConnection().then(async connection => {

    const server = new Koa()
    server.use(helmet())
    server.use(json())
    server.use(logger())
    server.use(bodyParser())

      // 绑定路由
      const app = useKoaServer(server, {
        controllers: [__dirname + '/controllers/*{.js,.ts,.tsx}']
    })

    app.listen(3001)
    console.log(`Koa application is up and running on port ${3001}`)
}).catch(error => console.log(error));
