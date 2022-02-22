export interface RouteBuilderService {
    addController(controller: string): RouteBuilderService;
    addAction(action: string): RouteBuilderService;
    addParameter(parameterName: string, parameterValue: string): RouteBuilderService;
    getRoute(): string;
}

export default class DefaultRouteBuilderService implements RouteBuilderService {
    private isParameterAdded = false;
    private route = '';

    public addController = (controller: string): RouteBuilderService => {
        this.route += controller;
        return this;
    }

    public addAction = (action: string): RouteBuilderService => {
        this.route += `/${action}`;
        return this;
    }

    public addParameter = (parameterName: string, parameterValue: string): RouteBuilderService => {
        if (!this.isParameterAdded) {
            this.isParameterAdded = true;
            this.route += '?';
        } else {
            this.route += '&';
        }

        this.route += `${parameterName}=${parameterValue}`;
        return this;
    }

    public getRoute = (): string => {
        return this.route;
    }
}