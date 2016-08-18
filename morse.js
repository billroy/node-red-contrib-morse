// morse out node
//
//	Copyright 2016 by Bill Roy (MIT License)
//
var Morse = require('./morseout.js');

module.exports = function(RED) {

    function MorseOutNode(options) {
        var node = this;
        RED.nodes.createNode(node, options);

        // send output message for keyon, keyoff, ptton, pttoff if specified
        function sendMsg(msgType) {
            if (options[msgType]) {
                var msg = node.morse.getCurrentMsg();
                if (msg) {
                    // clone the message object and set the payload
                    var msgClone = Object.assign({}, msg);
                    msgClone.payload = options[msgType];
                    node.send(msgClone);
                }
            }
        }

        node.morse = Morse();
        node.morse.init({
            morseOn:    function() { sendMsg('keyon'); },
            morseOff:   function() { sendMsg('keyoff'); },
            pttOn:      function() { sendMsg('ptton'); },
            pttOff:     function() { sendMsg('pttoff'); },
            wpm:        parseInt(options.wpm) || 20,
            pttdelay:   parseInt(options.pttdelay) || 1000
        });

        node.on('input', function(msg) {
            node.morse.morsePut(msg);
        });

        node.on('close', function(done) {
            if (node.morse) {
                node.morse.stop();
                delete node.morse;
                done();
            }
        });
    }
    RED.nodes.registerType('morse-out', MorseOutNode);
};
