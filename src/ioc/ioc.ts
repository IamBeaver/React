import { Container } from 'inversify';
import DefaultHttpService, { HttpService } from '../services/HttpService';
import DefaultUsersService, { UsersService } from '../services/UsersService';
import ownTypes from './ownTypes';

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<UsersService>(ownTypes.usersService).to(DefaultUsersService).inSingletonScope();