import { Request, Response } from "express";

export type ExpressRout = {
  rout: string;
  method: HTTPMethods;
};

type HTTPMethods = {
  GET?: EndpointMethod;
  POST?: EndpointMethod;
  PUT?: EndpointMethod;
  DELETE?: EndpointMethod;
};

type EndpointMethod = (request: Request, response: Response) => void;
