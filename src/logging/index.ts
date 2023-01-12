import { Log } from '../types/interfaces/Logging';

const Logging: Log = {
  captureMessage() {},
  captureException() {},
  addBreadcrumb() {},
  getCorrelationId() {
    return '';
  },
  getSessionId() {
    return '';
  },
  getRelease() {
    return '';
  },
};

export const setLogging = (log: Log) => {
  /* eslint-disable no-console */
  Logging.captureMessage = log ? log.captureMessage : console.log;
  Logging.captureException = log ? log.captureException : console.error;
  Logging.addBreadcrumb = log ? log.addBreadcrumb : console.log;
  Logging.getCorrelationId = log ? log.getCorrelationId : Logging.getCorrelationId;
  Logging.getSessionId = log ? log.getSessionId : Logging.getSessionId;
  Logging.getRelease = log ? log.getRelease : Logging.getRelease;
};

export default Logging;
