
        var DiceOnHold = []; // Dices that is on Hold and can't be re-activated
        var DiceOnHoldThisRound = []; // Dices that is on Hold but can be re-activated. Clicked on in current round
        var DicesThisRound = []; // array with dices in current round
        var currentRound = 0; //value of dices in current round
        var total = 0; //total value (might be local var)
        var currentPlayer = 1; //Identify what player is playing.
        var winner = null;
        var DiceOnHoldThisRoundBeforeRemove;

        function roleTheDice(Init){ 
            DiceOnHoldThisRoundBeforeRemove = DiceOnHoldThisRound;
            checkForPointsForOneRound(); //checking for points from dice values
            if(currentRound>0 || Init){ //cheking if you get points. You need points to role again
                for(var i = 0; i<DiceOnHoldThisRoundBeforeRemove.length;i++) //Update the dices from last role
                {
                    if(DiceOnHold.indexOf(DiceOnHoldThisRoundBeforeRemove[i])<0)
                        DiceOnHold.push(DiceOnHoldThisRoundBeforeRemove[i]);
                }
                if (DiceOnHold.length==6) //all dices gives points and therefor you can role all dices again
                       InitNewRole();  

                
                    console.log("#"+DiceOnHold.toString()+"#");
                //adding current role value and adding it to the previous roles
                document.getElementById("currentRound").value =Number(document.getElementById("currentRound").value) + Number(currentRound);
                for(var i = 1;i<=6;i++){ //running through the dices
                    if(DiceOnHold.indexOf("dice"+i)<0){ //if dice is not on hold it will role
                        //var rndNumber = Math.floor((Math.random() * 6) + 1); // getting the random number 1-6
                        var Dice = document.getElementById("dice"+i);
                        MakeAnimation(Dice);
                    }
                }
                DicesThisRound = []; //initialyze the array
                for (var i=0;i<DiceOnHoldThisRound.length;i++)
                {
                    if(DiceOnHold.indexOf(DiceOnHoldThisRound[i])<0) //something fishy here!!!
                        DiceOnHold.push(DiceOnHoldThisRound[i]); //adding dices on hold from the round to the array where it can't be chaged
                }
                DiceOnHoldThisRound = []; //init round on hold
                currentRound = 0; //init round value
            }
            else
                alert("Du skal have point på alle valgt terninger");
            
            
        }

        function RemoveDicesFromThisRound(DiceValue) //removing dices from current round after the multiple dice values is counted
        {
           // console.log("DicesThisRound" + DicesThisRound + " DiceValue " +DiceValue +"DicesThisRound.length-1 ="+(DicesThisRound.length-1) )//log
            for(var i = (DicesThisRound.length-1); i>=0;i--) 
            {
              // console.log("i="+ i + "DicesThisRound[i]" + DicesThisRound[i] + " DiceValue " +DiceValue )
                if (DicesThisRound[i] == DiceValue)
                {
                    DicesThisRound.splice(i,1);
                }
            }
        }

        function GetDiceValue(DiceValue) // get the value from dice values with 3 or more of the same > 1
        {
            DicesThisRound.sort();
            var DicesThisRoundString =DicesThisRound.toString();
            if(DicesThisRoundString.indexOf(DiceValue+","+DiceValue+","+DiceValue)>=0)
            {
                var RoundValue = DiceValue * 100; // 3 dices with same numbers
                if(DiceValue==1)
                    RoundValue =1000
               // 6 dices with same value
                if(DicesThisRoundString.indexOf(DiceValue+","+DiceValue+","+DiceValue+","+DiceValue+","+DiceValue+","+DiceValue)>=0)
                    {
                        RoundValue = RoundValue * 2 * 2 * 2
                        if(DiceValue==1)
                            RoundValue =10000
                    }
                // 5 dices with same value
                else if (DicesThisRoundString.indexOf(DiceValue+","+DiceValue+","+DiceValue+","+DiceValue+","+DiceValue)>=0)
                {
                    RoundValue = RoundValue * 2 * 2
                    if(DiceValue==1)
                        RoundValue =4000
                }
                // 4 dices with same value
                else if (DicesThisRoundString.indexOf(DiceValue+","+DiceValue+","+DiceValue+","+DiceValue)>=0)
                {
                    RoundValue = RoundValue * 2 
                    if(DiceValue==1)
                        RoundValue =2000
                }
                currentRound+=Number(RoundValue);
                RemoveDicesFromThisRound(DiceValue);
            }
        }

        function checkForPointsForOneRound() //cehck for points with dice value 1 and 5 and straight
        {
            for (var i = 1; i<=6; i++) // dices with same value check for each value 2-6, both included
            {
                GetDiceValue(i) // check if dices of same value gives points 
            }    
            //console.log("log1=" + currentRound +" DicesThisRound"+ DicesThisRound.toString());
            var DicesThisRoundString =DicesThisRound.toString();
            if (DicesThisRoundString.length>0)
            {            
                if(DicesThisRoundString == "1,2,3,4,5,6") // straight
                    currentRound+=1000;
                else if(DicesThisRoundString == "1,1,5")
                    currentRound+=250;
                else if(DicesThisRoundString == "1,1,5,5")
                    currentRound+=300;
                else if(DicesThisRoundString == "1,5,5")
                    currentRound+=200;
                else if(DicesThisRoundString == "1,1")
                    currentRound+=200;
                else if(DicesThisRoundString == "1,5")
                    currentRound+=150;
                else if(DicesThisRoundString == "5,5")
                    currentRound+=100;
                else if(DicesThisRoundString == "5")
                    currentRound+=50;
                else if(DicesThisRoundString  == "1")
                    currentRound+=100;
            }
           //     console.log("log2=" + currentRound);
        }

        function SetDiceONOFFHold(dice)
        {
           if (dice.style.opacity != '' && dice.style.opacity < '1'){
                if (DiceOnHoldThisRound.indexOf(dice.id)<0) //dices from previous round can't be ativated
                    alert("Not able to activate this dice. only dices in the same round can be activated");
                else // dice re-activate
                {
                    dice.style.opacity = 1;
                    DiceOnHoldThisRound.splice(DiceOnHoldThisRound.indexOf(dice.id),1)
                    DicesThisRound.splice(DicesThisRound.indexOf(dice.id),1);
                }
           }
           else // dice set on hold
           {
                dice.style.opacity = '0.3';
                DiceOnHoldThisRound.push(dice.id);
                DicesThisRound.push(dice.className.slice(4,5));
           }
          
        }

        function endTurn() // ending turn and cleaning up
        {
            // calculating the total
            DiceOnHoldThisRoundBeforeRemove = DiceOnHoldThisRound;
            checkForPointsForOneRound();
            document.getElementById("currentRound").value =Number(document.getElementById("currentRound").value) + Number(currentRound);
            total = Number(document.getElementById("currentRound").value)+Number(document.getElementById("in_total"+currentPlayer).value);
            var otherPlayer = document.getElementById("in_total1");
            //checking for winner
            if(currentPlayer==1)
                otherPlayer = document.getElementById("in_total2");
            if(total>=10000 || Number(otherPlayer.value)>=10000)
            {
                if(winner == null)
                    winner = currentPlayer;
                else
                {
                    if(total>Number(otherPlayer.value))
                        winner = currentPlayer;
                    alert("Player "+winner + " har vundet")
                    InitNewGame();
                }
               // console.log("winner "+winner);   
            }
          //  console.log("total"+total)
            var element = document.getElementById("in_total"+currentPlayer)
            if(!DiceOnHoldThisRoundBeforeRemove.length>0)
            {
                total = Number(document.getElementById("in_total"+currentPlayer).value)
            }
            if(total >= 1000) //first point entry must be 1000+
                element.value=total; //setting the total in field
            else
                {
                    element.value = " > 1000 ";
                    element.className = "inputAlert";
                    setTimeout(function(){element.value = 0;element.className=""}, 1500);
                }
           // cleanup and get ready for next turn
           currentRound = 0;
            InitNewRole();
            document.getElementById("currentRound").value = 0; //init the current round value
            ChangePlayer(); // change player
            roleTheDice(true); // role the dices to start for the new player.
        }

        function InitNewRole()
        {
            DiceOnHold = [];
            DicesThisRound = [];
            DiceOnHoldThisRound = [];
            for(var i = 1; i<=6;i++) //resetting the dices to active
            {
                var dice = document.getElementById("dice"+i);
                dice.style.opacity = 1;
            }
        }

        function InitNewGame()
        {
            currentPlayer = 1;
            total = 0;
            document.getElementById("spn_player"+currentPlayer).className = "isActive";  
            document.getElementById("currentRound").value = 0;
            document.getElementById("in_total1").value = 0;
            document.getElementById("in_total2").value = 0;
        }

        function ChangePlayer()
        {
            document.getElementById("spn_player"+currentPlayer).className = "isInactive";
            if(currentPlayer == 1)
                currentPlayer = 2;
            else 
                currentPlayer = 1;  
            document.getElementById("spn_player"+currentPlayer).className = "isActive";         
        }
        
        function MakeAnimation(Dice) //Dice is the object I want to animate
        {
            var id = setInterval(frame, 150); //interval is the time between each frame is showed
            var frames = 0 // initializing the frames/images to 0
            function frame(){   
                    if (frames>8) //continue until you reach 24 frames/images
                    {
                        clearInterval(id); //this will stop the animation
                        Dice.className = "dice"+rndNumber; //setting the class name/image to correct dice value
                    }
                    var rndNumber = Math.floor((Math.random() * 6) + 1); //setting the random number for the dice
                    Dice.className = "dice"+Number(rndNumber); // changing image on dice to make animation
                    
                    frames++; //Adding to frames so it will stop when it reaches limit set above.
            };
        }


        
     

