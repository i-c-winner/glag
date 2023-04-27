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
  conn: null as any,
  connection: function () {
    const xmpp = new Promise((resolve, reject) => {
      resolve(Xmpp.connection(Strophe))
    })
    xmpp.then((connection: any) => {
      this.conn = connection
      this.conn.addHandler(this.callbackHandler)
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
    console.log(from, type, elems)
    return true
  },
  setLocalDescription: function (stream: MediaStream) {
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
  }
}

export default glagolMeet
