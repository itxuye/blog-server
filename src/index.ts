import "reflect-metadata";
import { Container } from "typedi";
import { useContainer as ormUseContainer } from "typeorm";
import { AppModule } from "./app";
import { bootstrap } from "./server";
// config ioc container
ormUseContainer(Container);
bootstrap(AppModule);
