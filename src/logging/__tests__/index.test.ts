import Logging, { setLogging } from '../index';
import { Log } from '../../types/interfaces/Logging';

describe('Logging', () => {
  test('should set logging', () => {
    const log: Log = {
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

    setLogging(log);

    expect(Logging.captureMessage).toBe(log.captureMessage);
    expect(Logging.captureException).toBe(log.captureException);
    expect(Logging.addBreadcrumb).toBe(log.addBreadcrumb);
    expect(Logging.getCorrelationId).toBe(log.getCorrelationId);
    expect(Logging.getSessionId).toBe(log.getSessionId);
    expect(Logging.getRelease).toBe(log.getRelease);
  });

  test('if no logging is provided, console log should be used', () => {
    // Intentionally testing a runtime-error case
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    setLogging(null);

    expect(Logging.captureMessage).toBe(console.log);
    expect(Logging.captureException).toBe(console.error);
    expect(Logging.addBreadcrumb).toBe(console.log);
  });
});
