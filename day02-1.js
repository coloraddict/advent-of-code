document.getElementById('inputfile').addEventListener('change', function() {
  
  var fr=new FileReader();
  var raw_list = [];
  var limit = 2;
  var score_list = [];
  player1_score = [];
  player2_score = [];

  fr.onload=function(){
      raw_list = fr.result.split("\n");
      
      for(let i=0; i<raw_list.length; i++) {
        if(raw_list[i].length === 0){
        }        
        raw_list[i] = raw_list[i].split(" ");
        document.getElementById('output').textContent+= (i+1) + ": " + raw_list[i].toString() + "\n";
      }

      for(let i=0; i<raw_list.length; i++) {
        if(raw_list[i][0] === "A" && raw_list[i][1] === "X"){
          player2_score.push(4);
        } else if(raw_list[i][0] === "B" && raw_list[i][1] === "Y"){
          player2_score.push(5);
        } else if(raw_list[i][0] === "C" && raw_list[i][1] === "Z"){
          player2_score.push(6);
        }

        //ROCK WITH PAPER
        if(raw_list[i][0] === "A" && raw_list[i][1] === "Y"){
          player2_score.push(8);
        }

        //ROCK WITH SCISSOR
        if(raw_list[i][0] === "A" && raw_list[i][1] === "Z"){
          player2_score.push(3);
        }

        //PAPER WITH ROCK
         if(raw_list[i][0] === "B" && raw_list[i][1] === "X"){
          player2_score.push(1);
        }

        //PAPER WITH SCISSOR
        if(raw_list[i][0] === "B" && raw_list[i][1] === "Z"){
          player2_score.push(9);
        }

        //SCISSOR WITH ROCK
         if(raw_list[i][0] === "C" && raw_list[i][1] === "X"){
          player2_score.push(7);
        }

        //SCISSOR WITH PAPER
        if(raw_list[i][0] === "C" && raw_list[i][1] === "Y"){
          player2_score.push(2);
        }
      }

      console.log("player2_score length: ", player2_score.length);
      console.log("player2_score list : ", player2_score);
      console.log("player2_score: " + player2_score.reduce((n1, n2) => n1 + n2, 0));
  }
    
  fr.readAsText(this.files[0]);

})
