export interface Log {
  captureMessage(message): any;
  captureException(exception: any): any;
  addBreadcrumb(breadcrumb: any): any;
  getCorrelationId(): string;
  getSessionId(): string;
  getRelease(): string;
}
