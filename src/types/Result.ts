export interface Error {
  code: number;
  name: string;
  message: string;
}

interface SuccessResult<T> {
  success: true;
  data: T
}

interface ErrorResult {
  success: false;
  error: Error;
}

type Result<T> = SuccessResult<T> | ErrorResult;

export default Result;