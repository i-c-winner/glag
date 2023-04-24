class AbstractEvent  {
  constructor(props: any) {

  }

  private listeners: {};
  on (event: string, callback: Function): void{
    if (!this.listeners[event]) {
      this.listeners[event]=[]
    }
    this.listeners[event].push(event, callback)
  }
  off (event: string, callback: Function): void {
    this.listeners[event]=this.listeners[event].filter(listener => !callback)
  }
  emit (event : string, ...args : any[]) {
    if (!this.listeners[event]) {
      throw new Event(event, 'нет события')
    }
this.listeners[event].forEach(listener => listener(...args))
      }
}
export default AbstractEvent
