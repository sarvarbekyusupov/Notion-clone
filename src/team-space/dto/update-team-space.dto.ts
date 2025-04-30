import { PartialType } from '@nestjs/swagger';
import { CreateTeamSpaceDto } from './create-team-space.dto';

export class UpdateTeamSpaceDto extends PartialType(CreateTeamSpaceDto) {}
