import Xmpp from "./Xmpp";
const {Strophe}: any = require("strophe.js")
import getRandomText from "../plugins/getRandomText";
const register: any = require('strophe-plugin-register')
import RTC from './RTC'

const userId=getRandomText(5)
const password=getRandomText(7)

const glagolMeet={
  Strophe,
  connection: function() {
    const xmpp = new Promise((resolve, reject) => {
      resolve(Xmpp.connection(Strophe))
    })
  xmpp.then((connection: any)=>{
    this.conn=connection
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
      } else if (status === Strophe.Status.CONNECTED){
        console.info('connected')
      }
    }
  },
  init: function () {
    const pc= new Promise((resolve, reject)=>{
      resolve ( RTC.init())
    })
   pc.then((pc: any)=>{
      this.peerConnection=pc
    })
    return this
  }
}

export default glagolMeet
