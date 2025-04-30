import { Module } from '@nestjs/common';
import { TeamSpaceService } from './team-space.service';
import { TeamSpaceController } from './team-space.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamSpace } from './models/team-space.model';

@Module({
      imports: [SequelizeModule.forFeature([TeamSpace])],
  
  controllers: [TeamSpaceController],
  providers: [TeamSpaceService],
})
export class TeamSpaceModule {}
