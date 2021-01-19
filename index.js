let deck = []; // the empty deck to be filled in the shuffle function
let player1_name = "";
let player2_name = "";
let player1_logged_in = false;
let player2_logged_in = false;
let player1_cards = [];
let player2_cards = [];
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

let players = [
    {
        username: "John",
        password: "Cena",
        cards: [],

    },
    {
        username: "Ben",
        password: "Mynard",
        cards: [],
    }
];
shuffle()

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
    let count = 0;
    while(count < 30){
        $("#drawButton").css("display", "block")
        if(count%2 === 0){
            $("#players_turn").empty().append(player1_name + "'s turn")
            $("#drawButton").click(function(){
                draw_a_card();
            })
            count += 1
        }else{
            $("#players_turn").empty().append(player2_name + "'s turn")
            $("#drawButton").click(function(){
                draw_a_card();
            })
            count += 1
        }
    }
}


function draw_a_card(){
    $("#drawButton").css("display", "none")
    $("#p1").append("Hello")

}

