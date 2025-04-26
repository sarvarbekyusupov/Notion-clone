import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DevicesController } from "./devices.controller";
import { DevicesService } from "./devices.service";
import { Device } from "./models/device.model";

@Module({
  imports: [SequelizeModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
