document.getElementById('inputfile').addEventListener('change', function() {
  
  var fr=new FileReader();
  var raw_list = [];
  var limit = 2;
  var score_list = [];
  player1_score = [];
  player2_score = [];

  fr.onload=function(){
      raw_list = fr.result.split("\n");

      recreateList();
      printToFile();
      manipulateList();


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

      console.log(raw_list);
      // console.log("Rawlist length: ", raw_list.length);
      console.log("player2_score length: ", player2_score.length);
      // console.log("player2_score list : ", player2_score);
      console.log("player2_score: " + player2_score.reduce((n1, n2) => n1 + n2, 0));
      // console.log("player2_score: " + player2_score.reduce((n1, n2) => n1 + n2));
      // console.log(score_list);
  }
    
  fr.readAsText(this.files[0]);

  function recreateList(){
    iterate("recreate");
  }

  function printToFile(){
    iterate("print");
  }

  function manipulateList(){
    iterate("manipulate");
  }

  function iterate(task){
        for(let i=0; i<raw_list.length; i++) {
            if(task === "recreate"){
                raw_list[i] = raw_list[i].split(" ");
                if(raw_list[i][1] !== undefined){
                  raw_list[i][1] = raw_list[i][1].replace(/(\r\n|\n|\r)/gm, "");
                }
            } else if (task === "print"){
                document.getElementById('output').textContent+= (i+1) + ": " + raw_list[i].toString() + "\n";
            } else if(task === "manipulate"){
                if(raw_list[i][1] === "X"){
                    lose(i);
                } else if(raw_list[i][1] === "Y"){
                    draw(i);
                } else if(raw_list[i][1] === "Z"){
                    win(i);
                }
            }
        }
  }

  function lose(index){
    if(raw_list[index][0] === "A"){
        raw_list[index][1] = "Z";
    }else if(raw_list[index][0] === "B"){
        raw_list[index][1] = "X";
    }else if(raw_list[index][0] === "C"){
        raw_list[index][1] = "Y";
    }
  }

  function draw(index){
    if(raw_list[index][0] === "A"){
        raw_list[index][1] = "X";
    }else if(raw_list[index][0] === "B"){
        raw_list[index][1] = "Y";
    }else if(raw_list[index][0] === "C"){
        raw_list[index][1] = "Z";
    }
  }

  function win(index){
    if(raw_list[index][0] === "A"){
        raw_list[index][1] = "Y";
    }else if(raw_list[index][0] === "B"){
        raw_list[index][1] = "Z";
    }else if(raw_list[index][0] === "C"){
        raw_list[index][1] = "X";
    }
  }

})
