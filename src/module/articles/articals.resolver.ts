import { Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";

@Resolver('Articals')
export class ArticlesResolver {
     constructor(@Inject private ArticalSer){

     }
}