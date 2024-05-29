import { NextFunction, Request, Response } from "express";
import validator from "validator";

type ValidatedRequest = Request & {
    validation: { 
        results:  { [key: string]: { 
            [key: string]: boolean, valid: boolean 
        } }, 
        valid: boolean 
    }
}

export const validate = (propName: string) => {
    const tests: Record<string, (val: string) => boolean> = {};
    const handler = (req: Request, resp: Response, next: NextFunction ) => {

        const vreq = req as ValidatedRequest;
        if (!vreq.validation) {
            vreq.validation = { results: {}, valid: true };
        }
        vreq.validation.results[propName] = { valid: true };

        Object.keys(tests).forEach(k => {
            let valid = vreq.validation.results[propName][k]
                = tests[k](req.body?.[propName]);
            if (!valid) {
                vreq.validation.results[propName].valid = false;
                vreq.validation.valid = false;
            }
        });

        next();
    }
    handler.required = () => {
        tests.required = (val: string) => 
            !validator.isEmpty(val, { ignore_whitespace: true});
        return handler;
    };
    handler.minLength = (min: number) => {
        tests.minLength = (val:string) => validator.isLength(val, { min});
        return handler;
    };
    handler.isInteger = () => {
        tests.isInteger = (val: string) => validator.isInt(val);
        return handler;
    }
    return handler;
}

export const getValidationResults = (req: Request) => {
    return (req as ValidatedRequest).validation || { valid : true }
}
