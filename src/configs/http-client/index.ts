import { compose } from 'lodash/fp';
import { withAuth, withErrorHandler, createHttpInstance } from './decorators';

export default compose(
  withAuth,
  withErrorHandler,
  createHttpInstance
)({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
});
