import type {RequestHandler} from "express";

export interface Route {
	path: string;
	actionName: string;
	method: 'get'|'post';
	handler: RequestHandler
}

export interface Controller {
	path: string;
	routes: Route[]
}