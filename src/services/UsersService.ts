import { inject, injectable } from "inversify";
import BaseUserDto from "../dtos/BaseUserDto";
import UserDto from "../dtos/UserDto";
import ownTypes from "../ioc/ownTypes";
import HttpService, { MethodType } from "./HttpService";
import RouteBuilderService from "./RouteBuilderService";

export interface UsersService {
    getAllUsers(): Promise<UserDto[]>;
    deleteUser(id: number): Promise<boolean>;
    updateUser(user: UserDto): Promise<boolean>;
    createUser(user: BaseUserDto): Promise<number>;
}

const controllerName = '/Users';

@injectable()
export default class DefaultUsersService implements UsersService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService,
        @inject(ownTypes.routeBuilderService) private readonly routeBuilderService: RouteBuilderService
    ) {
    }

    public getAllUsers = async(): Promise<UserDto[]> => {
        return (await this.httpService.send<UserDto[]>(this.routeBuilderService.addController(controllerName)
        .addAction('GetAllUsers')
        .getRoute(),
        MethodType.GET)).data;
    }
    
    public deleteUser = async(id: number): Promise<boolean> => {
        return (await this.httpService.send<boolean>(this.routeBuilderService.addController(controllerName)
        .addAction('DeleteUser')
        .addParameter('Id', id.toString())
        .getRoute(),
        MethodType.DELETE)).data;
    }

    public updateUser = async(user: UserDto): Promise<boolean> => {
        return (await this.httpService.send<boolean>(this.routeBuilderService.addController(controllerName)
        .addAction('UpdateUser')
        .addParameter('Id', user.id.toString())
        .addParameter('FirstName', user.firstName.toString())
        .addParameter('LastName', user.lastName.toString())
        .addParameter('Age', user.age.toString())
        .getRoute(),
        MethodType.PUT)).data;
    }

    public createUser = async(user: BaseUserDto): Promise<number> => {
        return (await this.httpService.send<number>(this.routeBuilderService.addController(controllerName)
        .addAction('CreateUser')
        .addParameter('FirstName', user.firstName.toString())
        .addParameter('LastName', user.lastName.toString())
        .addParameter('Age', user.age.toString())
        .getRoute(),
        MethodType.POST)).data;
    }
}