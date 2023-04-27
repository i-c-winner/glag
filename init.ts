import glagolMeet from "./src/glagol/Glagol";
import mediaDevices from "./src/glagol/mediaDevices";
let localStream: null | MediaStream= null

function setLocalStream(...args:[MediaStream]) {
  localStream=args[0]
}

glagolMeet.init()
glagolMeet.connection()
mediaDevices.init()
mediaDevices.on('localStreamInstaled', setLocalStream)
console.log(glagolMeet, 'mediadevisec')
setTimeout(()=>{console.log(localStream, 'localstream')}, 500)
