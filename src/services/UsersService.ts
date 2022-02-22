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

enum Action {
    GetAllUsers = 'GetAllUsers',
    DeleteUser = 'DeleteUser',
    CreateUser = 'CreateUser',
    UpdateUser = 'UpdateUser',
}

const CONTROLLER_NAME = '/Users';
const ID = 'Id';
const FIRST_NAME = 'FirstName';
const LAST_NAME = 'LaseName';
const AGE = 'Age';

@injectable()
export default class DefaultUsersService implements UsersService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService,
        @inject(ownTypes.routeBuilderService) private readonly routeBuilderService: RouteBuilderService
    ) {
    }

    public getAllUsers = async(): Promise<UserDto[]> => {
        return (await this.httpService.send<UserDto[]>(this.routeBuilderService.addController(CONTROLLER_NAME)
        .addAction(Action.GetAllUsers.toString())
        .getRoute(),
        MethodType.GET)).data;
    }
    
    public deleteUser = async(id: number): Promise<boolean> => {
        return (await this.httpService.send<boolean>(this.routeBuilderService.addController(CONTROLLER_NAME)
        .addAction(Action.DeleteUser.toString())
        .addParameter(ID, id.toString())
        .getRoute(),
        MethodType.DELETE)).data;
    }

    public updateUser = async(user: UserDto): Promise<boolean> => {
        return (await this.httpService.send<boolean>(this.routeBuilderService.addController(CONTROLLER_NAME)
        .addAction(Action.UpdateUser.toString())
        .addParameter(ID, user.id.toString())
        .addParameter(FIRST_NAME, user.firstName.toString())
        .addParameter(LAST_NAME, user.lastName.toString())
        .addParameter(AGE, user.age.toString())
        .getRoute(),
        MethodType.PUT)).data;
    }

    public createUser = async(user: BaseUserDto): Promise<number> => {
        return (await this.httpService.send<number>(this.routeBuilderService.addController(CONTROLLER_NAME)
        .addAction(Action.CreateUser.toString())
        .addParameter(FIRST_NAME, user.firstName.toString())
        .addParameter(LAST_NAME, user.lastName.toString())
        .addParameter(AGE, user.age.toString())
        .getRoute(),
        MethodType.POST)).data;
    }
}