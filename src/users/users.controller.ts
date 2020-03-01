import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Company } from './interfaces/company.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('findByUrl')
  async findByUrl(@Body() req: {url: string}): Promise<{result: boolean}> {
    return this.usersService.existByUrl(req.url)
  }

  @Get('companies')
  async getAllCompanies() {
    return this.usersService.getAllCompanies();
  }

}
