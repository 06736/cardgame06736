let deck = []; // the empty deck to be filled in the shuffle function
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
    event.preventDefault();
    let username = $("#htmlUsername").val()
    let password = $("#htmlPassword").val()
    $(".input1").val("")
    $("#p1").append(username)
    for(let i = 0; i < 2;i++){
        if(username === players[i][0]){
            if(password === players[i][1]){
                $("#p1").empty().append("Login Successful")
            }
        }
    }

}

