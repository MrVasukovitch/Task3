class Table
{
    constructor(matrix, names)
    {
        this.matrix=matrix;
        this.names=names;
        this.formatTable();
    }
    formatTable()
    {
       let temp=Object.entries(this.matrix);
       temp.forEach((element, index)=>{
           element[0]=this.names[index];
           let temp1=Object.entries(element[1]);
           temp1.forEach((elemental,indexx)=>{
               elemental[0]=this.names[indexx];
               switch(elemental[1]){
                   case 0: elemental[1]='lose'; break;
                   case 1: elemental[1]='win'; break;
                   case 2: elemental[1]='draw'; break;
               }
           });
           element[1]=Object.fromEntries(temp1);
        });
       this.matrix=Object.fromEntries(temp);
       console.table(this.matrix);
    }
}
module.exports =Table;