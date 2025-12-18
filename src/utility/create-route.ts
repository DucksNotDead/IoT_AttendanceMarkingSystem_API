import type { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { logsService } from '~/data-services/app-logs/index.js';

function validateBody<T>(dto: {
  [P in keyof T]: 'string' | 'number';
}) {
  return [
    ...Object.entries(dto).map(([key, value]) => {
      return body(key)
        .notEmpty()
        [value === 'string' ? 'isString' : 'isNumeric']();
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        next();
      } else {
        res.status(400).send(result);
      }
    },
  ];
}

export const createRoute =
  <T = undefined>(
    method: 'get' | 'post',
    path: string,
    handler: (body: T) => unknown | number,
    bodyValidator?: { [P in keyof T]: 'string' | 'number' },
  ) =>
  (app: Express) =>
    app[method](
      path,
      ...(bodyValidator ? validateBody<T>(bodyValidator) : []),
      async (req, res) => {
        const handlerResult = await handler(req.body);

        const studentId = req?.body?.studentId ?? undefined;
        let status = 200;
        let result = handlerResult;

        if (Number.isInteger(handlerResult)) {
          status = handlerResult as number;
          result = {};
        }

        if (method === 'post') {
          logsService.createLog({
            studentId,
            status,
            timestamp: Date.now(),
            operation: path,
          });
        }

        return res.status(status).json(result);
      },
    );
