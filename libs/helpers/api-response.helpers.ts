export class ApiResponse<T> {
  status: boolean;
  data?: T;
  errors?: any;

  constructor(status: boolean, data?: T, errors?: any) {
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return new ApiResponse(true, data);
}

export function createErrorResponse(errors: any): ApiResponse<any> {
  return new ApiResponse(false, null, errors);
}
