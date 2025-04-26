import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { BlocksModule } from './types/blocks/blocks.module';
// import { BlocksModule } from './blocks/blocks.module';
import { TypesModule } from './types/types.module';
// import { BlockPropertiesModule } from './block_properties/block_properties.module';
import { PropertiesModule } from './properties/properties.module';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize"; // <-- missing import
import { AdminModule } from './admin/admin.module';
import { BlocksModule } from './blocks/blocks.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Admin } from './admin/models/admin.model';
import { Block } from './blocks/models/block.model';
import { Property } from './properties/models/property.model';
import { User } from './user/models/user.model';
import { Type } from './types/models/type.model';
import { BlockProperty } from './blocks/models/block-properties.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Admin, Block, Property, User, Type, BlockProperty],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    AdminModule,
    BlocksModule,
    AuthModule,
    PropertiesModule,
    TypesModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
