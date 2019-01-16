import "reflect-metadata";
import { Container } from "typedi";
import { useContainer as ormUseContainer } from "typeorm";
import { Injector } from "@graphql-modules/di";
import { AppModule } from "./app";
import { bootstrap } from "./server";
// config ioc container
(new Injector()).provide()
ormUseContainer(Container);
ormUseContainer(Injector);
bootstrap(AppModule);
