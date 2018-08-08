import "reflect-metadata";
import * as Koa from 'koa'
import { createConnection, useContainer as ormUseContainer, } from "typeorm";
import { useKoaServer, useContainer as routingUseContainer, } from 'routing-controllers'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as helmet from 'koa-helmet'
import { Container } from 'typedi';

// config ioc container
routingUseContainer(Container);
ormUseContainer(Container);

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
