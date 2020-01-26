export default interface IApiRequestResult<T> {
  response?: T;
  error?: string;
}
