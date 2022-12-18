document.getElementById('inputfile').addEventListener('change', function() {
  
  var fileReader=new FileReader();

  fileReader.onload=function(){
      document.getElementById('output').textContent=fileReader.result;

      list = fileReader.result;

      var ruckSack = new RuckSack(list);
  }            
    
  fileReader.readAsText(this.files[0]);

})

class RuckSack {

    list = [];
    c1 = [];
    c2 = [];
    totalItems = 0;
    commonTypes = [];
    totalPriorities = 0;
    itemTypeSmall = [];
    itemTypeCapital = [];

    constructor(list){
        this.list = list;
        this.itemTypeSmall = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r", "s", "t", "u", "v", "w", "x", "y", "z" ];
        this.itemTypeCapital = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]; 
        
        this.render(this.list);
        this.totalItems = this.list.length;
        this.splitContainer(this.list);
        this.findCommonTypes();
        this.sumPriorities();
    }

    render(list){
        this.list = list.split("\n");
    }

    splitContainer(list){
        this.c1 = list.map(item => item.substr(0, item.length/2));
        this.c2 = list.map(item => item.substr(item.length/2, item.length-1));
    }

    findCommonTypes(){
        let i = 0;
        while (i < this.totalItems) {
            this.commonTypes.push(this.c1[i].split('').filter(item => {
                if(String(this.c2[i]).includes(item)){
                    return item;
                }
            }))
            i++;    
        }

    }

    sumPriorities(){
        for(let i=0; i<this.c1.length; i++) {            
            var a = this.c1[i].split('');
            for(let j=0; j<a.length; j++) {
                if( String(this.c2[i]).includes(a[j]) ){
                    if(this.itemTypeSmall.indexOf(a[j])!==-1){
                        this.totalPriorities+=this.itemTypeSmall.indexOf(a[j])+1;
                        // console.log("SMALL", a[j], this.itemTypeSmall.indexOf(a[j])+1);
                    }else if(this.itemTypeCapital.indexOf(a[j])!==-1){
                        this.totalPriorities+=this.itemTypeCapital.indexOf(a[j])+27;
                        // console.log("CAPITAL", a[j], this.itemTypeCapital.indexOf(a[j])+27);
                    }
                    break;
                }
            }
        }
        console.log(this.totalPriorities);
    }
}