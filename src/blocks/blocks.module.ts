import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { PropertiesService } from 'src/properties/properties.service';
import { PropertiesModule } from '../properties/properties.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from './models/block.model';
import { Property } from '../properties/models/property.model';
import { BlockProperty } from './models/block-properties.model';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Block, BlockProperty, Property]),
    PropertiesModule,
  ],

  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksModule, BlocksService],
})
export class BlocksModule {}
