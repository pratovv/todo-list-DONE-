import {  TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config:TypeOrmModuleOptions={
    type:'postgres',
    username:'postgres',
    password:'1',
    port:5432,
    host:'127.0.0.1',
    database:'try123123',
    synchronize:true,
    entities:['dist/**/*.entity{.ts,.js}']
    
}