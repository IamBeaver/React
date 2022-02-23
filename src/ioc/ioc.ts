import { Container } from "inversify";
import DefaultHttpService, { HttpService } from "../services/HttpService";
import DefaultRouteBuilderService, { RouteBuilderService } from "../services/RouteBuilderService";
import DefaultUsersService, { UsersService } from "../services/UsersService";
import UsersListStore from "../stores/UsersListStore";
import ownTypes from "./ownTypes";

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<UsersService>(ownTypes.usersService).to(DefaultUsersService).inSingletonScope();
container.bind<RouteBuilderService>(ownTypes.routeBuilderService).to(DefaultRouteBuilderService).inTransientScope();
container.bind<UsersListStore>(ownTypes.usersListStore).to(UsersListStore).inSingletonScope();