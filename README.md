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
