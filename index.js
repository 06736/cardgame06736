
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
let startdraw = true;
function shuffle(){ //creates a shuffled array of the cards

    let suit = ["red", "yellow", "black"] //creates every card
    for (let i = 0; i < 3; i++){
        for(let j = 1;j<11;j++){
            deck.push(suit[i]+j.toString())
        }
    }
    for(let i = 0; i < 31; i++){ //shuffle
        let a = Math.floor((Math.random()*30));
        let b = Math.floor((Math.random()*30));
        let temp = deck[b]; //swaps the values
        deck[b] = deck[a];
        deck[a] = temp;
    }
}
shuffle()

let players = [ //stores the players credentials
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
    let login = false;
    let username = $("#htmlUsername").val() // variables for the values of the form submission
    let password = $("#htmlPassword").val()
    $(".input1").val("") //makes the form blank again
    for (let i = 0; i < 2; i++) {
        if (username === players[i]["username"]) { // if the username input matches a username from the "database"
            if (password === players[i]["password"]) { // if the password input matches with the username adjacent to it in the "database"
                login = true;
                if (!player1_logged_in) { // if player 1 is not logged in
                    player1_logged_in = true
                    player1_name += username
                    $("#pl1").append(player1_name);
                }else{ //if a player is logged in
                    if(player1_name === username){ //wont let the same person log in twice
                        login = false;
                    }else{
                         // logs in the second player and hides the form
                        $("#login_form1").css("display", "none")
                        player2_logged_in = true
                        player2_name += username
                        $("#pl2").append(player2_name);
                    }
                }
            }
        }
    }
    let flash;
    if(!login){
        $("#login_form1").css("border-color", "red").css("transition", "0.5s");
        flash = setTimeout(function (){
            $("#login_form1").css("border-color", "mediumpurple").css("transition", "1.5s");
        }, 1000)
    }else{
        $("#login_form1").css("border-color", "mediumaquamarine").css("transition", "0.5s");
        flash = setTimeout(function (){
            $("#login_form1").css("border-color", "mediumpurple").css("transition", "1.5s");
        }, 1000)
    }
    if(player1_logged_in === true && player2_logged_in === true){ // if both players have logged in
        $("#main_menu_play").css("display", "inline-block")
    }
}

function game(){

    $("#main_menu_play").css("display", "none")
    $("#my_button").css("display", "inline-block")
    $(".pl").css("display", "flex");
    $(".playerturn").css("height", "75%").css("width", "20%").css("top", "12%").css("display", "inline-block").css("border-color", "mediumpurple")
    $("#player1turn").css("width", "38%").css("height", "90%").css("top", "5%").css("border-color", "mediumaquamarine")
    let count = 0

        $("#my_button").click(function(){ //if the draw button is pressed
            $("#player2turn").css("width", "38%").css("height", "90%").css("top", "5%")
            if(deck.length !== 0){ // as long as there are cards in the array
                if (count=== 0) {
                    p1_temp = deck[0]
                    if(startdraw){
                        startdraw=false;
                        card_creation(p1_temp, p2_temp, count)
                        $(".playerturn").css("height", "75%").css("width", "20%").css("top", "12%").css("border-color", "mediumpurple")
                        $("#player2turn").css("width", "38%").css("height", "90%").css("top", "5%").css("border-color", "mediumaquamarine")

                    }else{
                        card_creation(p1_temp, p2_temp, count)
                        $(".playerturn").css("height", "75%").css("width", "20%").css("top", "12%").css("border-color", "mediumpurple")
                        $("#player2turn").css("width", "38%").css("height", "90%").css("top", "5%").css("border-color", "mediumaquamarine")
                    }
                    count++ //count is incremented, the card is removed from the deck and added to p1s hand
                    deck.splice(0, 1)
                }else if(count === 1){
                    //same as above but for p2
                    count++
                    console.log(count)
                    p2_temp = deck[0]
                    card_creation(p1_temp, p2_temp, count)
                    deck.splice(0, 1)
                }


                if(count === 2) {
                    count = 0;

                    if (p1_temp.includes("red")) {

                        if (p2_temp.includes("red")) {
                            //isolates the number after the colour into a substring then converts it into an integer so the sizes can be compared
                            if (parseInt(p1_temp.substring(3, p1_temp.length)) > parseInt(p2_temp.substring(3, p2_temp.length))) {
                                p1Round()

                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("yellow")) { // for if the colours are different, it will decide which colour wins
                            p2Round()
                        } else if (p2_temp.includes("black")) {
                            p1Round()
                        }
                    } else if (p1_temp.includes("yellow")) {
                        if (p2_temp.includes("yellow")) {
                            if (parseInt(p1_temp.substring(6, p1_temp.length)) > parseInt(p2_temp.substring(6, p1_temp.length))) {
                                p1Round()
                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("black")) {
                            p2Round()
                        } else if (p2_temp.includes("red")) {
                            p1Round()
                        }
                    } else if (p1_temp.includes("black")) {
                        if (p2_temp.includes("black")) {
                            if (parseInt(p1_temp.substring(5, p1_temp.length)) > parseInt(p2_temp.substring(5, p1_temp.length))) {
                                p1Round()
                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("red")) {
                            p2Round()
                        } else if (p2_temp.includes("yellow")) {
                            p1Round()
                        }

                    }
                }
            }else{

            }

            if(count === 0){
                $("#my_button").css("display", "none") //end of round messages + continue button for the next round
                $("#my_button2").css("display", "block")
                $(".playerturn").css("height", "75%").css("width", "20%").css("top", "12%").css("border-color", "mediumpurple")
                $("#my_button2").click(function(){
                    $("#my_button").css("display", "block")
                    $("#my_button2").css("display", "none")
                })
            }

        })





}

function continue_button(){
    $("#p3").empty()
    $(".playerturn").css("height", "75%").css("width", "20%").css("top", "12%").css("border-color", "mediumpurple")
    $("#player1turn").css("width", "38%").css("height", "90%").css("top", "5%").css("border-color", "mediumaquamarine")
    $(".playercard").css("visibility", "hidden")

}
function p1Round(){
    $("#p3").empty().append(player1_name + " wins!")
    player1_cards.push(p2_temp, p1_temp); //winner p1
    p1_temp = "";
    p2_temp = "";
}
function p2Round(){
    $("#p3").empty().append(player2_name + " wins")
    player2_cards.push(p2_temp, p1_temp);
    p2_temp = "";
    p1_temp = ""; //winner p2
}

function card_creation(p1_temp, p2_temp, count){
    if (count === 0){
        if(p1_temp.includes("red")){ //if the card is red
            $("#player1card").css("background-image", "linear-gradient(to bottom right, red, darkred)").css("visibility", "visible");
            $("#p1_number").css("color", "darkslateblue").empty().append(p1_temp.substring(3, p1_temp.length));
        }else if(p1_temp.includes("black")){
            $("#player1card").css("background-image", "linear-gradient(to bottom right, gray, black)").css("visibility", "visible")
            $("#p1_number").css("color", "white").empty().append(p1_temp.substring(5, p1_temp.length))
        }else{ //yellow
            $("#player1card").css("background-image", "linear-gradient(to bottom right, yellow, orange)").css("visibility", "visible")
            $("#p1_number").css("color", "mediumvioletred").empty().append(p1_temp.substring(6, p1_temp.length))
        }
    }else{
        if(p2_temp.includes("red")){ //if the card is red
            $("#player2card").css("background-image", "linear-gradient(to bottom right, red, darkred)").css("visibility", "visible")
            $("#p2_number").css("color", "darkslateblue").empty().append(p2_temp.substring(3, p2_temp.length));
        }else if(p2_temp.includes("black")){
            $("#player2card").css("background-image", "linear-gradient(to bottom right, gray, black)").css("visibility", "visible")
            $("#p2_number").css("color", "white").empty().append(p2_temp.substring(5, p2_temp.length))
        }else{ //yellow
            $("#player2card").css("background-image", "linear-gradient(to bottom right, yellow, orange)").css("visibility", "visible")
            $("#p2_number").css("color", "mediumvioletred").empty().append(p2_temp.substring(6, p2_temp.length))
        }
    }
}
function endGame(){ //this will occur when the deck length is 0
    //removes everything on the screen
    //some animations
    //declares the winner
    //option to play again
    //option to view overall scoreboard (later on)
}


