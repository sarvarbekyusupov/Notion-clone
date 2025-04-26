import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Device } from "./models/device.model";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device)
    private readonly deviceModel: typeof Device
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceModel.create(createDeviceDto);
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.findAll();
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceModel.findByPk(id);
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);
    await device.update(updateDeviceDto);
    return device;
  }

  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    await device.destroy();
  }

  async findByUserId(userId: number): Promise<Device[]> {
    return this.deviceModel.findAll({
      where: { user_id: userId },
    });
  }
}
