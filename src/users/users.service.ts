import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { map } from 'rxjs/operators';
import { Company } from './interfaces/company.interface';


const md5: (x: string) => string = require('md5');
const punycode: { toUnicode: (x: string) => string } = require('punycode');


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>, private http: HttpService) { }

  async create(createUserDto: CreateUserDto): Promise<{ user: User, md5: string }> {

    let existUser = await this.findByUrl(createUserDto.url.toLowerCase());
    if (existUser) {
      return { user: existUser, md5: md5((<string>existUser.id)) };
    }

    let user = Object.assign({},
      createUserDto,
      {
        url: createUserDto.url.toLowerCase()
          .replace('http://', '')
          .replace('https://', '')
          .split(' ').join('')
          .split('/').join('')
      }
    );
    const createdUser = new this.UserModel(user);
    return await createdUser.save().then(user => {
      return { user, md5: md5((<string>user.id)) };
    });
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email: email }).exec();
  }

  async findByUrl(url: string): Promise<User> {
    let user = await this.UserModel.findOne({ url: url }).exec();
    let urlFromPunyCode = punycode.toUnicode(url);
    let userPunycode = await this.UserModel.findOne({ url: urlFromPunyCode }).exec();
    return user && user.email ? user : userPunycode;
  }

  async existByUrl(url: string): Promise<{ result: boolean }> {
    let user = await this.findByUrl(url);
    let result = user && user.url ? true : false;
    return { result: result }
  }

  async getAllCompanies() {
    // let yclientKeyApi = process.env.yclientKeyApi ? process.env.yclientKeyApi : '6j596f78crj67ryuzpea';
    let yclientKeyApi = '6j596f78crj67ryuzpea';
    let apiUrl = 'https://api.yclients.com/api/v1/companies';
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `Bearer ${yclientKeyApi}`,
    };
    const result = await this.http.get<Company[]>(apiUrl, { headers: headersRequest }).pipe(
      map(response => response.data),
    );
    return result;
  }

}
