const crypto = require('crypto')

function codificaPwd(str)
{

  testoCodificato = crypto.createHash("sha256").update(str).digest('hex') 

 return testoCodificato;
}




module.exports = codificaPwd