import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { Roles } from '../Decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<Users>,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  async convertUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<Users>,
  ) {
    return this.usersService.updateUser(id, user);
  }
}
