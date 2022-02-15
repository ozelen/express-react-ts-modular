import { logger } from './logger';
import { getToken } from './token';

export const useController = controller => 
  ({body, method, params, query, user, originalUrl, headers}, res, next) => {
    const token = getToken(headers);
		controller({body, method, ...params, ...query, context: {user, token}}).then(result => {
      res.send(result);
		}).catch((err) => {
      logger.error([
        method,
        originalUrl,
        user.email,
        err.message,
      ].join(','));

      res.status(err.code || 500).send(err);
		})
  }
