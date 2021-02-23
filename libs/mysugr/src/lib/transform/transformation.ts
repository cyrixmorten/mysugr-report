export interface ITransformation<I, O> {
  transform(data: I[]): O[]
}
