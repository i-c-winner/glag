import {listenerCancelled} from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";

const mediaDevices = {
  listeners: {},
  on: function (event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event]=[]
    }
    this.listeners[event].push(callback)
  },

  localStreams: null as any,
  streamPromise: new Promise((resolve, reject) => {
    resolve(navigator.mediaDevices.getUserMedia({video: true, audio: true}))
  }) as any,
  init:function () {
    this.streamPromise.then((streams: any)=>{
      this.localStreams=streams
      this.listeners.localStreamInstaled.forEach((listener: Function)=>{
        listener(streams)
      })
    })
  } as any
}
export default mediaDevices
