export type HttpResponse = {
  statusCode: number;
  body: any;
};

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  };
}

export function created<T>(dto?: T): HttpResponse {
  return {
    statusCode: 201,
    body: dto,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error) {
  console.error(error);

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  };
}
