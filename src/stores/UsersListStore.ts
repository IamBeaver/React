import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../ioc/ownTypes";
import User from "../models/User";
import UsersService  from "../services/UsersService";

@injectable()
export default class UsersListStore {
    public users: User[] = [];

    public constructor(
        @inject(ownTypes.usersService) private readonly usersService: UsersService
    ) {
        makeAutoObservable(this);
    }

    public init = async(): Promise<void> => {
        this.users = await this.usersService.getAllUsers();
    }
}