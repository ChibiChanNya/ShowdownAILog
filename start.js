/**
 * Created by Chibi on 06/02/17.
 */

var sjsc = require('sockjs-client-ws');
var request = require('request');


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
    // processMessage(msg);
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
    if(chunks[1] == "init"){
        send("|Hello nyans");
    }
}



/// MAIN FLOW
var options = { method: 'POST',
    //Local Server
    url: 'https://play.pokemonshowdown.com/~~localhost/action.php',
    //Official Servers
    // url: 'https://play.pokemonshowdown.com/~~showdown/action.php',
    headers:
        { 'postman-token': '881c798c-6e69-7576-f52a-49eb72948ada',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded' },
    form: "act=login&name=PorygonDelta&pass=porybot215&challstr=4%7C605d6c793ce95191f33c6fcd0afb2fe47f00c9b889db6312cd20c3e29f39fedff8cf29e604db30e54a1bf45f877f5ee3b083d7d4f4b5dc418137d9fec58e55232cd297c637bbc71fda8472fa77c72376e4ff53f7407c826e805d50e0be0590af45a675a3ea97e807e62a9523ac7271ec45767e6976c6502cadfd711bcc4301dc%7C653445mqf9469345mqf9628645mqf9876345mqf93012"
};



request(options, function (error, response, body) {
    if (error) throw new Error(error);

    let user = JSON.parse(body.substr(1)).curuser;
    let assertion = JSON.parse(body.substr(1)).assertion;
    let login_message = "|/trn "+user.username+",0,"+ assertion ;
    send("|/avatar 42,1");
    send("|/autojoin");
    send(login_message);

});







