const RTC = {
  init:function () {
     return new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ]
      }
    )
  }
}

export default RTC
