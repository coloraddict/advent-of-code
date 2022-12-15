document.getElementById('inputfile').addEventListener('change', function() {
  
  var fileReader=new FileReader();
  var elfs = [];
  var sumCalories = 0;
  var highestCalory = 0;

  fileReader.onload=function(){
      document.getElementById('output').textContent=fileReader.result;

      list = fileReader.result;
      
      //Group elfs by calories
      elfs = list.split("\n");
      elfs = elfs.toString().split(",,").map(x => x.split(",").filter(y => y.length > 0));

      //Sum calories of each elf
      sumCalories = elfs.map((elf) => {
        return elf.reduce((cal1, cal2) => parseInt(cal1, 10) + parseInt(cal2, 10), 0);
      })

      //Highest calory carried by elf
      highestCalory = sumCalories.sort((a,b) => a-b).reverse()[0];
      console.log(largest_number);
  }
    
  fileReader.readAsText(this.files[0]);

})