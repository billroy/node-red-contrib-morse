# node-red-contrib-morse README

## What is it?

A node which converts input text into messages timed to send International Morse code.

This node converts the text received in the msg.payload field of incoming messages to a series of output messages timed to signal the start (keyon) and end (keyoff) of elements in International Morse code at the specified sending rate.  

There are also optional messages which signal the beginning (ptton where ptt means push-to-talk) and end (pttoff) of a complete message to enable device push-to-talk control or its equivalent.

Multiple input messages are buffered in the node and sent in the order they are received.

## Parameters

The WPM field sets the sending speed in words per minute.  Values between 5 and 20 are reasonable; the default is 10.

The KeyOn Payload field sets the msg.payload to be emitted when the virtual morse key goes down, in other words, when an element transmission begins.  Likewise, the KeyOff Payload is the msg.payload to be emitted when the key goes up and an element ends.

Example:Set keyon='0,0,red' and keyoff='0,0,black' and wire the output of the Morse node to a Raspberry Pi SenseHat input node.  Text payloads sent to the Morse node will be signaled with red flashes on LED 0,0.

The PTTOn Payload specifies a payload to be sent at the beginning of a message, before any elements are sent, perhaps to bring up the output device and give it time to stabilize.  Likewise, the PTTOff Payload specifies the payload to be sent at the end of a message, perhaps to turn off the transmitter or output device.

There is a configurable delay after the PTTOn message is sent before the first KeyOn message; this is specified in the PTT Delay field.

## Example Flow

Here is an example flow that pipes four separate morse flows to a SenseHat (three RSS feeds and a fixed CQ message):

```
[{"id":"1f14e52b.39e8fb","type":"rpi-sensehat out","z":"9a6f09e8.fe3128","name":"","x":690,"y":420,"wires":[]},{"id":"bdff729c.e43c3","type":"morse-out","z":"9a6f09e8.fe3128","name":"","wpm":"20","keyon":"0-1,0-1,64,0,0","keyoff":"0-1,0-1,black","ptton":"","pttoff":"","pttdelay":"","x":390,"y":420,"wires":[["1f14e52b.39e8fb"]]},{"id":"8e649e35.78aa8","type":"feedparse","z":"9a6f09e8.fe3128","name":"bbc top stories","url":"http://feeds.bbci.co.uk/news/rss.xml","interval":15,"x":160,"y":420,"wires":[["bdff729c.e43c3"]]},{"id":"df2214f1.8c7aa8","type":"feedparse","z":"9a6f09e8.fe3128","name":"bbc world","url":"http://feeds.bbci.co.uk/news/world/rss.xml","interval":"5","x":140,"y":540,"wires":[["502c1323.62bbdc","f8781cf1.40d7d"]]},{"id":"502c1323.62bbdc","type":"morse-out","z":"9a6f09e8.fe3128","name":"","wpm":"10","keyon":"7,7,64,0,0","keyoff":"7,7,black","ptton":"","pttoff":"","pttdelay":"","x":390,"y":480,"wires":[["1f14e52b.39e8fb"]]},{"id":"f8781cf1.40d7d","type":"morse-out","z":"9a6f09e8.fe3128","name":"","wpm":"15","keyon":"1,7,green","keyoff":"1,7,black","ptton":"","pttoff":"","x":390,"y":540,"wires":[["1f14e52b.39e8fb"]]},{"id":"f71ead0.071e25","type":"morse-out","z":"9a6f09e8.fe3128","name":"","wpm":"7","keyon":"7,0,orange","keyoff":"7,0,black","ptton":"7,1,orange","pttoff":"7,1,black","pttdelay":"1000","x":390,"y":600,"wires":[["1f14e52b.39e8fb"]]},{"id":"bfeabdc7.a8895","type":"inject","z":"9a6f09e8.fe3128","name":"","topic":"","payload":"CQ DX","payloadType":"str","repeat":"20","crontab":"","once":false,"x":160,"y":600,"wires":[["f71ead0.071e25","f8781cf1.40d7d","502c1323.62bbdc","bdff729c.e43c3"]]},{"id":"e56c70f9.54625","type":"feedparse","z":"9a6f09e8.fe3128","name":"bbc sci/env","url":"http://feeds.bbci.co.uk/news/science_and_environment/rss.xml","interval":15,"x":150,"y":480,"wires":[["502c1323.62bbdc"]]}]
```
