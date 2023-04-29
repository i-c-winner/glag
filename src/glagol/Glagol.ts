import Xmpp from "./Xmpp";

const {Strophe}: any = require("strophe.js")
import getRandomText from "../plugins/getRandomText";

const register: any = require('strophe-plugin-register')
import RTC from './RTC'

const userId = getRandomText(5)
const password = getRandomText(7)

const glagolMeet = {
  peerConnection: null as RTCPeerConnection,
  Strophe,
  listeners: {},
  conn: null as any,
  connection: function () {
    const xmpp = new Promise((resolve, reject) => {
      resolve(Xmpp.connection(Strophe))
    })
    xmpp.then((connection: any) => {
      this.conn = connection
      this.conn.addHandler(this.callbackHandler.bind(this))
      connection.register.connect("@prosolen.net", callbackRegistry.bind(this))

    })

    function callbackRegistry(status: number) {
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        this.conn.register.fields.username = userId;
        this.conn.register.fields.password = password;
        // calling submit will continue the registration process
        this.conn.register.submit();
      } else if (status === Strophe.Status.REGISTERED) {
        console.log("registered!");
        // calling login will authenticate the registered JID.
        this.conn.authenticate();
      } else if (status === Strophe.Status.CONFLICT) {
        console.log("Contact already existed!");
      } else if (status === Strophe.Status.NOTACCEPTABLE) {
        console.log("Registration form not properly filled out.")
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration")
      } else if (status === Strophe.Status.CONNECTED) {
this.emit('connected')
      }
    }
  },
  init: function () {
    const pc = RTC.init()
    this.peerConnection = pc
    return this
  },

  callbackHandler(stanza: any) {
    const from = stanza.getAttribute('from')
    const type = stanza.getAttribute('type')
    const elems = stanza.getElementsByTagName('body')
    if (type === 'chat') {
      const message = Strophe.getText(elems[0])
      if (message === 'add_track') {
        this.peerConnection.addTransceiver('video', {'direction': 'recvonly'})
        this.peerConnection.addTransceiver('audio', {'direction': 'recvonly'})
        this.peerConnection.createOffer({'iceRestart': true}).then((offer: any) => {
          this.peerConnection.setLocalDescription(offer)

        })
      } else {
        const rtcSd = new RTCSessionDescription((JSON.parse(window.atob(message))))
        try {
          this.peerConnection.setRemoteDescription(rtcSd).then(() => {
            this.emit('addTrack', this.peerConnection.getRemoteStreams())
          })
        } catch (e) {
          console.error(e)
        }
      }
    }
    return true
  },
  setLocalDescription: function (stream: MediaStream) {
    this.peerConnection.onaddstream = function (stream: any) {
    }
    this.peerConnection.onicecandidate = (event: any) => {
      if (event.candidate === null) {
        const localDescription = window.btoa(JSON.stringify(this.peerConnection.localDescription))
        const message = $msg({to: 'admin_cs@prosolen.net', type: 'chat'}).c('body').t(localDescription)
        this.conn.send(message)
      }
    }
    stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track)
    })
    this.peerConnection.createOffer().then((offer: any) => this.peerConnection.setLocalDescription(offer))
  },

  localStream: null as null | MediaStream,
  getLocalStream: function () {
    return this.localStream
  },
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  },
  emit(emit: string, ...args: [...any[]]) {
    this.listeners[emit].forEach((listener: Function) => {
      listener(args)
    })
  }
}

export default glagolMeet
