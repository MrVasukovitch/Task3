const Table = require("./Table");
let args=process.argv.slice(2);
let arr=new Array(args.length);
arr[0]=2;
for (let i=1; i<=arr.length/2; i++)
{
    arr[i]=0;
}
for (let i=arr.length-1; i>arr.length/2; i--)
{
    arr[i]=1;
}
let matrix=new Array(args.length);
matrix[0]=arr.slice(0);
for (let i=1; i<arr.length; i++)
{
    let temp=arr.pop();
    arr.unshift(temp);
    matrix[i]=arr.slice(0);
}
console.log(matrix);
let temp=new Table(matrix, args);