import { auth, middleware } from './auth';
import { authenticate } from './strategies';

import './local';
// import './jwt';
// import './oauth2';

export {
  auth,
  authenticate,
  middleware,
};
