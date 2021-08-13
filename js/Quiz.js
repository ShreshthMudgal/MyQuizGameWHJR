class Quiz {
  constructor(){
    this.result = createElement('h3')
  }
    
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    this.result.html("Result of Quiz");
    this.result.position(350, 0);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE : contestants who answered correct are highlighted in green color!",130,230);
    }
    //write code to add a note here
    var position = 230
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      position = position + 20;
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer)
      fill("green");
      else
      fill("red");

      text(allContestants[plr].name + " = " + allContestants[plr].answer, 200, position );
    }
  }

}
