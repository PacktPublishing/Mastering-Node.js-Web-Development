import { Express, Response } from "express";
import { ValidationError } from "./validation_types";

export interface WebService<T> {
    getOne(id: any) : Promise<T | undefined>;
    getMany(query: any) : Promise<T[]>;
    store(data: any) : Promise<T | undefined>;
    delete(id: any): Promise<boolean>;
    replace(id: any, data: any): Promise<T | undefined>;
    modify(id: any, data: any): Promise<T | undefined>;    
}

export function createAdapter<T>(app: Express, ws: WebService<T>, baseUrl: string) {

    app.get(baseUrl, async (req, resp) => {
        try {
            resp.json(await ws.getMany(req.query));
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    app.get(`${baseUrl}/:id`, async (req, resp) => {
        try {
            const data = await ws.getOne((req.params.id));
            if (data == undefined) {
                    resp.writeHead(404);
            } else {
                    resp.json(data);
            }
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    app.post(baseUrl, async (req, resp) => {
        try {
            const data = await ws.store(req.body);
            resp.json(data);
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    app.delete(`${baseUrl}/:id`, async (req, resp) => {
        try {
            resp.json(await ws.delete(req.params.id));
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    app.put(`${baseUrl}/:id`, async (req, resp) => {
        try {
            resp.json(await ws.replace(req.params.id, req.body));
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    app.patch(`${baseUrl}/:id`, async (req, resp) => {
        try {
            resp.json(await ws.modify(req.params.id, req.body));
            resp.end();
        } catch (err) { writeErrorResponse(err, resp) }
    });

    const writeErrorResponse = (err: any, resp: Response) => {
        console.error(err);
        resp.writeHead(err instanceof ValidationError ? 400 : 500);
        resp.end();
    }
}
