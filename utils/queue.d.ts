type Task<R> = () => Promise<R>
interface QueueJob<R> {
  resolve: (value: R) => void
  reject: (reason: unknown) => void
  run: Task<R>
}
export default class Queue {
  protected queue: Array<QueueJob<unknown>>
  protected running: boolean
  constructor()
  protected enqueue(job: QueueJob<unknown>): void
  protected dequeue(): QueueJob<unknown> | undefined
  add<R>(task: Task<R>): Promise<R>
  protected run(): void
}
export {}
