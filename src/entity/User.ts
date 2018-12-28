import {Entity, PrimaryGeneratedColumn, ObjectID, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: ObjectID;

    @Column()
    userName: string;
}
