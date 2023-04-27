import glagolMeet from "./src/glagol/Glagol";
import mediaDevices from "./src/glagol/mediaDevices";

let localStream: null | MediaStream = null




const glagol = glagolMeet.init()
glagolMeet.connection()
mediaDevices.init()
mediaDevices.on('localStreamInstaled', setLocalStream)
function setLocalStream(...args: [MediaStream]) {
  localStream = args[0]
  setTimeout(()=>{
    glagol.localStream=localStream
    glagolMeet.setLocalDescription(localStream)
  }, 2000)
}


export default glagol
