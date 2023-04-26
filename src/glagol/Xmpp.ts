function register(status: any) {
  console.log(status)
}

const Xmpp = {
  connection(strophe: any) {
    return new Promise((resolve, reject) => {
      resolve(new strophe.Connection("https://xmpp.prosolen.net:5281/http-bind"))
    })
  }
}

export default Xmpp
