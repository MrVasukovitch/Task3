const { rejects, match } = require('assert');
const hmac = require('crypto-js/hmac');
const { resolve } = require('path');
const { resourceUsage } = require('process');

class Game
{
    constructor(){
        this.args=this.getArgs();
        this.matrix=this.generateMatrix();
        this.readline = require('readline-sync');
        this.computerChoise=this.generateComputerMove();
    }
    getArgs()
    {
        let args=process.argv.slice(2);
        return args;
    }
    generateBasisArr()
    {
        let arr=new Array(this.args.length);
        arr[0]=2;
        for (let i=1; i<=arr.length/2; i++)
            arr[i]=0;
        for (let i=arr.length-1; i>arr.length/2; i--)
            arr[i]=1;
        return arr;
    }
    generateMatrixFromBasisArr(arr)
    {
        let matrix=new Array(this.args.length);
        matrix[0]=arr.slice(0);
        for (let i=1; i<arr.length; i++)
        {
            let temp=arr.pop();
            arr.unshift(temp);
            matrix[i]=arr.slice(0);
        }
        return matrix; 
    }
    generateMatrix()
    {
        let arr=this.generateBasisArr();
        let matrix=this.generateMatrixFromBasisArr(arr);
        return matrix;
    }
    availableMoves()
    {
        console.log('avilable moves:');
        for (let i=0; i<this.args.length; i++)
        {
            console.log((i+1)+' - '+this.args[i]);
        }
            console.log('0'+' - '+'exit');
            console.log('?'+' - '+'help');
    }
    enterYourMove()
    {
            try{
                let value=this.readline.question('Enter your move: ',resolve);
                if ((typeof(Number(value))!='string')&&(typeof(this.args[value-1])=='undefined')){
                    throw value;
                }
                this.playerMove=Number(value)-1;
                console.log('Your move: '+this.args[this.playerMove]);
              } catch(error){
                  if (error==0)
                    process.exit();
                  if (error=='?')
                    return 2;
                return 1;  
              }
              return 0;
    }
    calculateWiner()
    {
        return this.matrix[this.computerChoise][this.playerMove];
    }
    outputResult(result)
    {
        console.log('Computer move: '+this.args[this.computerChoise]);
        if(result==0)
        console.log('You Win');
        else if(result==1)
        console.log('You lose');
        else console.log('Draw');
    }
    generateComputerMove()
    {
        return Math.floor(Math.random()*(this.args.length-1));
    }
    validateGame()
    {
        if(this.args.length==0)
            throw 'arguments not found';
        if(this.args.length%2==0)
            throw 'arguments must be odd';
        if(this.args.length==1)
            throw 'not enough arguments';
        let uniqueArray = this.args.filter((val, ind, arr) => arr.indexOf(val) === ind);
        if(this.args.length!=uniqueArray.length)
            throw "argumets mustn't contain duplicate elements";

    }
    main()
    {
        try {
            this.validateGame();
        }catch(error)
        {
            console.log(error);
            return;
        }
        const Table = require("./Table");
        const HmacGen = require("./HmacGen");
        let hmacGen=new HmacGen(this.computerChoise);
        hmacGen.outputHmac();
        let error=0;
        do{
            this.availableMoves();
            error=this.enterYourMove();
            if(error==2){
                let table=new Table(this.matrix,this.args);
                error=1;
            }
        }while(error==1);
        let result=this.calculateWiner();
        this.outputResult(result);
        hmacGen.outputKey();
    }
}

let game=new Game();
game.main();