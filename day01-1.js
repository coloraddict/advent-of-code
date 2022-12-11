document.getElementById('inputfile').addEventListener('change', function() {
  
  var fileReader=new FileReader();
  var raw_list = [];
  var processed_list = [];
  var summed_up_list = [];
  var largest_number = 0;
  var second_largest_number = 0;
  var third_largest_number = 0;

  fileReader.onload=function(){
      document.getElementById('output').textContent=fileReader.result;
      raw_list = fileReader.result.split("\n");
      
      var tmp_list = [];

      for(let i=0; i<raw_list.length; i++) {
        if(raw_list[i].length > 0) {
          tmp_list.push(raw_list[i]);
        } else {
          processed_list.push(tmp_list);
          tmp_list = [];
        }
      }

      for(let i=0; i<processed_list.length; i++) {
        summed_up_list[i] = processed_list[i].reduce((n1, n2) => parseInt(n1) + parseInt(n2), 0);
      }

      largest_number = summed_up_list.sort((a,b) => a-b).reverse()[0];
      console.log(largest_number);
  }
    
  fileReader.readAsText(this.files[0]);

})