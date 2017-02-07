/**
 * Created by Chibi on 06/02/17.
 */

const request = require("request");
const WebSocket = require("ws");


var constructSocket = function () {
    return new WebSocket('https://localhost:8000/showdown');
};



var ws = constructSocket();

ws.on('open', function open(socket) {
    console.log("Opened!");
    socket.send('/avatar 42,1');


    var options = { method: 'POST',
        url: 'https://play.pokemonshowdown.com/~~showdown/action.php',
        headers:
            { 'postman-token': '881c798c-6e69-7576-f52a-49eb72948ada',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded' },
        form: "act=login&name=PorygonDelta&pass=porybot215&challstr=4%7C605d6c793ce95191f33c6fcd0afb2fe47f00c9b889db6312cd20c3e29f39fedff8cf29e604db30e54a1bf45f877f5ee3b083d7d4f4b5dc418137d9fec58e55232cd297c637bbc71fda8472fa77c72376e4ff53f7407c826e805d50e0be0590af45a675a3ea97e807e62a9523ac7271ec45767e6976c6502cadfd711bcc4301dc%7C653445mqf9469345mqf9628645mqf9876345mqf93012" };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log("RESPONSE:", body);
        // socket.send("/trn ChibiChan,0,007e0a6dbe4466b0aa466b1398590bcc45e584782ec341a3ad130345b052989bec60590af12ceb8b5cb1f24cfbfe2709daf63df7659fcf5c15231397c701706a27d300422d0a6c459b8903047aec3a76d10ad0e8331bba33a7c2b73ca5241f2b7407fb427570694274b8e187b18896d57ae52db6a8bf14f385517b1a1571c5f7,chibichan,4,1486438806,sim.psim.us,ec45859652ea4069,be21401251b59075,2181fb595d637b19;14bfa60c567627a33bf80d34d8d2dd3dda8f6f33d29dcdcab8dd67b3aa9d2b220462fc03b35664b7abed33b034c8589844eae1217616580faa8aca21c7b82ca70f318e93bb5fb16b6016998d8377275c94109b961c3cbabf29db896951e910e2b5c21855eab569ca06b7c2282dbe3c3bb42ee4817d7934bd6d2f65a7dc6a8e57ddbbfcb46eeedc7661d1abf604dff409700fad3b91e406d88422d699d2b9df1a8425897c64fd05f79de65340a26e532b116a76a98a798917400a91b7486596bba2512b08f902bba5fe722f09f18aa7b45b4e35d29702a76bb403bb1f0b0f726436f53903bf473494a185b73f2ded4bef2a482d9e209046819c9b8f1cb55ef088b0a1da3a811ee00a45d3c1f49aac2244e16eacf9fa64fec68f15864ff9aaad3eaa18cd0d235a6c3d1daec3b7e9464acb9668392ed7eacf67aaeef7f9d47cc0f18ce502ecbb3d05ae50d700af552bbf3c5d0ac72a166ccd147f7bd6092c8e8b52db0a3e1428699604e78ef032e0e97adac6bf1f49692f5374c4cf3b391a5605d66df9a398c99971e98fc760761fdb67697b2a673d4bd67b04ea97168ac6d0c86d17cd87c76180833ae039a496e94b3f1ce8e1f314b2240a2c619dbb0feab0570bfeb37277784a516c4752976ead29c66d1d62bf357d5173d12720cc4158e24f77fe7dadbb56b73e3ce071b15f205bec13e4e09aaf648252b08ae921fa30502d68")
    });


});







