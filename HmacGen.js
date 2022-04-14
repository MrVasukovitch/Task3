class HmacGen extends require("./KeyGen.js")
{
    hmac;
    computerChoise;
    constructor(computerChoise)
    {
        super();
        this.computerChoise=computerChoise;
        this.hmac=this.generateHmac();
    }
    get computerChoise()
    {
        return this.computerChoise;
    }
    generateHmac() 
    {
        let chilkat = require('@chilkat/ck-node16-win-ia32');
        let crypt = new chilkat.Crypt2();
        crypt.MacAlgorithm = "hmac";
        crypt.EncodingMode = "hex";
        crypt.SetMacKeyString(this.key);
        crypt.HashAlgorithm = "SHA-256";
        return crypt.MacStringENC(this.computerChoise);
    }
    outputHmac()
    {
        console.log('hmac: '+this.hmac);
    }
    outputKey()
    {
        console.log('key: '+this.key);
    }
}
module.exports =HmacGen;
