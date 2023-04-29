import glagolMeet from "./src/glagol/Glagol";
import mediaDevices from "./src/glagol/mediaDevices";

let localStream: null | MediaStream = null




const glagol = glagolMeet.init()
glagolMeet.connection()

glagol.on('connected', connected)
function connected(){
  mediaDevices.init()

  mediaDevices.on('localStreamInstaled', setLocalStream)
  function setLocalStream(...args: [MediaStream]) {
    localStream = args[0]
      glagol.localStream=localStream
      glagolMeet.setLocalDescription(localStream)
  }
}




export default glagol
