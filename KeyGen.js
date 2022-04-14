class KeyGen 
{
    key;
    constructor(computerChoise)
    {
        this.key=this.generateKey();
    }
    generateKey()
    {
        let os = require('os');
        let chilkat = require('@chilkat/ck-node16-win-ia32');
        let prng=new chilkat.Prng();
        return prng.GenRandom(32,"hex");
    }
}
module.exports=KeyGen;