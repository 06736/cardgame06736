let deck = []; // the empty deck to be filled in the shuffle function
let player1_name = "";
let player2_name = "";
let player1_logged_in = false;
let player2_logged_in = false;
let player1_cards = [];
let p1_temp = ""
let player2_cards = [];
let p2_temp = "";
let buttonCount = 0; //for creating multiple buttons with different IDs
function shuffle(){ //creates a shuffled array of the cards

    let suit = ["red", "yellow", "black"]
    for (let i = 0; i < 3; i++){
        for(let j = 1;j<11;j++){
            deck.push(suit[i]+j.toString())
        }
    }
    for(let i = 0; i < 31; i++){
        let a = Math.floor((Math.random()*30));
        let b = Math.floor((Math.random()*30));
        let temp = deck[b]; //swaps the values
        deck[b] = deck[a];
        deck[a] = temp;

    }
    console.log(deck)
}
shuffle()
let players = [
    {
        username: "John",
        password: "Cena",


    },
    {
        username: "Ben",
        password: "Mynard",

    }
];


function login(){
    event.preventDefault(); //stops the page reloading after form submission
    let username = $("#htmlUsername").val() // variables for the values of the form submission
    let password = $("#htmlPassword").val()
    $(".input1").val("") //makes the form blank again
    for (let i = 0; i < 2; i++) {
        if (username === players[i]["username"]) { // if the username input matches a username from the "database"
            if (password === players[i]["password"]) { // if the password input matches with the username adjacent to it in the "database"
                if (!player1_logged_in) { // if player 1 is not logged in
                    $("#p1").empty().append("Login for player 1 successful!")
                    player1_logged_in = true
                    player1_name += username
                }else{ //if a player is logged in
                    if(player1_name === username){ //wont let the same person log in twice
                        $("#p1").empty().append("Player already logged in!")
                    }else{
                        $("#p1").empty().append("Login for player 2 successful!") // logs in the second player and hides the form
                        $("#login_form1").css("display", "none")
                        player2_logged_in = true
                        player2_name += username
                    }
                }
            }
        }
    }
    if(player1_logged_in === true && player2_logged_in === true){
        $("#main_menu_play").css("display", "block")
        $("#p1").empty();
    }
}

function game(){
    drawTheButton()
    let count = 0

        $("#my_button").click(function(){


                if (count=== 0) {
                    count++
                    p1_temp = deck[0]
                    deck.splice(0, 1)
                } else if(count === 1){
                    count++
                    p2_temp = deck[0]
                    deck.splice(0, 1)
                }

            console.log(p1_temp);console.log(p2_temp);
            if(count === 2){
                count = 0;
                if(p1_temp.search("red")){
                    if(p2_temp.search("red")){
                        if(parseInt(p1_temp.substring(3,p1_temp.length)) > parseInt(p2_temp.substring(3,p2_temp.length))){
                            player1_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner is p1
                            $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                        }else{
                            player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                            $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                        }
                    }else if(p2_temp.search("yellow")){
                        player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                        $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                    }else if (p2_temp.search("black")){
                        player1_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p1
                        $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                    }
                }else if(p1_temp.search("yellow")){
                    if(p2_temp.search("yellow")){
                        if(parseInt(p1_temp.substring(6,p1_temp.length)) > parseInt(p2_temp.substring(6,p1_temp.length))){
                            player1_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p1
                            $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                        }else{
                            player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                            $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                        }
                    }else if (p2_temp.search("black")){
                        player1_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p1
                        $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                    }else if (p2_temp.search("red")){
                        player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                        $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                    }
                }else if(p1_temp.search("black")){
                    if(p2_temp.search("black")){
                        if(parseInt(p1_temp.substring(5,p1_temp.length)) > parseInt(p2_temp.substring(5,p1_temp.length))){
                            player1_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p1
                            $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                        }else{
                            player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                            $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                        }
                    }else if (p2_temp.search("red")){
                        player2_cards.push(p2_temp, p1_temp);p2_temp = ""; p1_temp = ""; //winner p2
                        $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
                    }else if(p2_temp.search("yellow")) {
                        player1_cards.push(p2_temp, p1_temp); //winner p1
                        p2_temp = "";
                        p1_temp = "";
                        $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
                    }

                }
            }
            if(count === 0){
                $("#my_button").css("display", "none")
                $("#my_button2").css("display", "block")
                $("#my_button2").click(function(){
                    $("#my_button").css("display", "block")
                    $("#my_button2").css("display", "none")
                })
            }

        })




}
function drawTheButton(){
    let button = document.createElement("BUTTON")
    button.setAttribute("id", "my_button")
    button.innerHTML = "Draw a card";
    document.body.appendChild(button);
}




