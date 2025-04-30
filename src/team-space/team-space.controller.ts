import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamSpaceService } from './team-space.service';
import { CreateTeamSpaceDto } from './dto/create-team-space.dto';
import { UpdateTeamSpaceDto } from './dto/update-team-space.dto';

@Controller('team-space')
export class TeamSpaceController {
  constructor(private readonly teamSpaceService: TeamSpaceService) {}

  @Post()
  create(@Body() createTeamSpaceDto: CreateTeamSpaceDto) {
    return this.teamSpaceService.create(createTeamSpaceDto);
  }

  @Get()
  findAll() {
    return this.teamSpaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamSpaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamSpaceDto: UpdateTeamSpaceDto) {
    return this.teamSpaceService.update(+id, updateTeamSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamSpaceService.remove(+id);
  }
}
