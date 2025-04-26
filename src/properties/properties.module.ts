import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './models/property.model';

@Module({
  imports: [SequelizeModule.forFeature([Property])],

  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesModule, PropertiesService],
})
export class PropertiesModule {}
