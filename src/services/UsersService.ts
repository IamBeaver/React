import { inject, injectable } from "inversify";
import BaseUserDto from "../dtos/BaseUserDto";
import UserDto from "../dtos/UserDto";
import ownTypes from "../ioc/ownTypes";
import HttpService, { MethodType } from "./HttpService";

export interface UsersService {
    getAllUsers(): Promise<UserDto[]>;
    deleteUser(id: number): Promise<void>;
    updateUser(user: UserDto): Promise<void>;
    createUser(user: BaseUserDto): Promise<void>;
}

const controllerName = '/Users';

@injectable()
export default class DefaultUsersService implements UsersService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService 
    ) {
    }

    public async getAllUsers(): Promise<UserDto[]> {
        const result = await this.httpService.send<UserDto[]>(`${controllerName}/GetAllUsers`, MethodType.GET);
        return result.data;
    }
    
    public async deleteUser(id: number): Promise<void> {
        await this.httpService.send(`${controllerName}/DeleteUser?Id=${id}`, MethodType.DELETE);
    }

    public async updateUser(user: UserDto): Promise<void> {
        await this.httpService.send(`${controllerName}/UpdateUser?Id=${user.id}&FirstName=${user.firstName}&LastName=${user.lastName}&Age=${user.age}`, MethodType.PUT);
    }

    public async createUser(user: BaseUserDto): Promise<void> {
        await this.httpService.send(`${controllerName}/CreateUser?FirstName=${user.firstName}&LastName=${user.lastName}&Age=${user.age}`, MethodType.POST);
    }
    
}