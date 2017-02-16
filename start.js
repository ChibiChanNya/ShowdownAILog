/**
 * Created by Chibi on 06/02/17.
 */
/*jslint node:true*/

var sjsc = require('sockjs-client-ws');
var request = require('request');

var state= {};



var constructSocket = function () {
    return  sjsc.create("http://localhost:8000/showdown");

};

var client = constructSocket();

client.on('connection', function () {
    //connection is established
    console.log("Connection established!!");

});


client.on('data', function (msg) {
    //Received Data
    console.log("Received <<<", msg, "\n");
    processMessage(msg);
});

client.on('error', function (e) {
    // something went wrong
    console.log("ERROR", e);
});

var send = function(message){
    console.log ("Sending  >>>", message, "\n");
    client.write(message);
};

function processMessage(message){
    let chunks = message.split("|");
    // console.log("chunks:",chunks, "\n");
    switch(chunks[1]){

        case "challstr":
            let challstr = chunks[2]+'|'+chunks[3];
            console.log("challstr is:", challstr);
            login(challstr);
            break;

        case "updatechallenges":
            let challenges = JSON.parse(chunks[2]);
            console.log(challenges);
            let challengers = challenges.challengesFrom;
            let first_challenger = Object.keys(challengers);
            send('|/accept '+ first_challenger);
            break;

        case "request":
            let mySide = JSON.parse(chunks[2]);
            console.log(JSON.stringify(mySide, null, 4));
            state[chunks[0]].availible_moves = mySide.active[0].moves;
            state[chunks[0]].my_team = mySide.side.pokemon;
            state[chunks[0]].active_pokemon= myside.side.pokemon[0];
            state[chunks[0]].active_pokemon.hp = myside.side.pokemon[0].condition.substr(0,3);
            break;

        // case "player":
        //     let enemySide=
        //     break;

    }
    if(chunks[1] == "challstr"){

    }
}





/// MAIN FLOW
function login(challstr){

    var options = { method: 'POST',
        //Local Server
        url: 'https://play.pokemonshowdown.com/~~localhost/action.php',
        //Official Servers
        // url: 'https://play.pokemonshowdown.com/~~showdown/action.php',
        headers:
            { 'postman-token': '881c798c-6e69-7576-f52a-49eb72948ada',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded' },
        form: "act=login&name=PorygonDelta&pass=porybot215&challstr="+challstr
    };

    console.log("FORM:", options.form);


    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log("HTTP RESPONSE: ", body);
        let user = JSON.parse(body.substr(1)).curuser;
        let assertion = JSON.parse(body.substr(1)).assertion;
        console.log("ASSERTION:", assertion);
        let login_message = "|/trn "+user.username+",0,"+ assertion ;
        send("|/avatar 42,1");
        send("|/autojoin");
        send(login_message);
    });

};









