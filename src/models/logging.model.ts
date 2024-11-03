export class LoggingModel {
  timestamp: string;

  id: string;

  request: RequestLogger;

  response?: ResponseLogger;
}

class RequestLogger {
  type: string;

  query?: string;

  variables?: string;

  ip: string;

  userAgent: string;

  token?: string;

  method?: string;

  path?: string;

  body?: any;

  params?: any;
}

class ResponseLogger {
  body: any;
}
