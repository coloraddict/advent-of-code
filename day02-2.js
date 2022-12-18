document.getElementById('inputfile').addEventListener('change', function() {
  
  var fileReader=new FileReader();
  

  fileReader.onload=function(){
      document.getElementById('output').textContent=fileReader.result;

      guide = fileReader.result;

      var tournament = new Tournament();
      tournament.begin(guide);
  }
    
  fileReader.readAsText(this.files[0]);

  class Tournament{    

    constructor(){
      var guide = [];
      var opponent = [];
      var player = [];
      var totalRounds = 0;
      var index = 0;
      var result;
      var shapes;

      this.shapes = [
        { "id": ["A", "X"], "name": "rock", "defeats": "scissor", "points": 1, "loses": "paper" }, 
        { "id": ["B", "Y"], "name": "paper", "defeats": "rock", "points": 2, "loses": "scissor" }, 
        { "id": ["C", "Z"], "name": "scissor", "defeats": "paper", "points": 3, "loses": "rock" }, 
      ];
      var gamePoints;
    }  

    begin(guide){
      this.guide = guide;
      this.result = [];
      this.gamePoints = { "lost": 0, "draw": 3, "won": 6 };
      this.render();
      this.startRound();
    }

    render(){
      this.index = 0;
      this.guide = this.guide.split("\n");
      this.guide = this.guide.map(item => item.replace(/(\r\n|\n|\r)/gm, "").split(" "));
      this.totalRounds = this.guide.length;
      this.opponent = this.guide.map(item => {
        if(item[0] !== undefined || item[0] !== "undefined"){
          return item[0];
        }
      });
      this.player = this.guide.map(item => {
        if(item[1] !== undefined || item[1] !== "undefined"){
          return item[1];
        }
      });
      this.changeStrategy();
    }

    resolve(){
      var op = this.opponent[this.index];
      var pl = this.player[this.index];
      var op_type = this.getType(op);
      var pl_type = this.getType(pl);
      this.result.push(this.finalizeRound(op_type, pl_type));
      this.nextRound();    
    }

    changeStrategy(){
        for(let i=0; i<this.totalRounds; i++) {
            if(this.player[i] === "X") {
                this.lose(i);
            } else if(this.player[i] === "Y") {
                this.draw(i);
            } else if(this.player[i] === "Z") {
                this.win(i);
            }
        }
    }

    lose(index){
        if(this.opponent[index] === "A"){
            this.player[index] = "Z";
        }else if(this.opponent[index] === "B"){
            this.player[index] = "X";
        }else if(this.opponent[index] === "C"){
            this.player[index] = "Y";
        }
    }

    draw(index){
        if(this.opponent[index] === "A"){
            this.player[index] = "X";
        }else if(this.opponent[index] === "B"){
            this.player[index] = "Y";
        }else if(this.opponent[index] === "C"){
            this.player[index] = "Z";
        }
    }

    win(index){
        if(this.opponent[index] === "A"){
            this.player[index] = "Y";
        }else if(this.opponent[index] === "B"){
            this.player[index] = "Z";
        }else if(this.opponent[index] === "C"){
            this.player[index] = "X";
        }
    }

    startRound(){
      this.resolve();      
    }

    nextRound(){
      if(this.index !== (this.totalRounds-1)){
        this.index++;
        this.resolve();
      } else {
        this.showResult();
      }
    }

    getType(t){
      for(let i=0; i<this.shapes.length; i++) {
        if(this.shapes[i].id.includes(t)){
          return this.shapes[i];
        }
      }
    }

    finalizeRound(op, pl){
      var pts = 0;
      if(pl.name === op.defeats) {
        pts = this.getWinningPoints(pl, 'l');
      } else if (pl.name === op.loses){
        pts = this.getWinningPoints(pl, 'w');
      } else {
        pts = this.getWinningPoints(pl, 'd');
      }
      return pts; 
    }

    getWinningPoints(p, s){
      var pts = 0;
      if(s === "l"){
        pts = this.gamePoints.lost + p.points;
      } else if(s === "w"){
        pts = this.gamePoints.won + p.points;
      } else {
        pts = this.gamePoints.draw + p.points;
      }
      return pts;
    }

    showResult(){
      console.log(this.result.reduce((n1, n2) => parseInt(n1, 10) + parseInt(n2, 10), 0));
    }
  }

})