export default class Queue {
  queue: any[]
  running: boolean
  constructor() {
    this.queue = []
    this.running = false
  }
  enqueue(job: any) {
    this.queue.push(job)
  }
  dequeue() {
    return this.queue.shift()
  }
  async add(task: any) {
    return await new Promise((resolve, reject) => {
      const queue = {
        resolve,
        reject,
        run: task,
      }
      this.enqueue(queue)
      this.run()
    })
  }
  run() {
    if (this.queue.length > 0 && !this.running) {
      this.running = true
      const job = this.dequeue()
      job
        .run()
        .then(job.resolve)
        .catch(job.reject)
        .finally(() => {
          this.running = false
          this.run()
        })
    }
  }
}
