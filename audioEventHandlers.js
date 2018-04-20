'use strict';

var controller = require('./audioController.js');

var audioEventHandlers =  {
    'PlaybackStarted' : function () {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         */
        console.log("Playback started");        
        this.emit(':responseReady');
    },
    'PlaybackFinished' : function () {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         */
        console.log("Playback finished");
        this.emit(':responseReady');
    },
    'PlaybackStopped' : function () {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         */
        console.log("Playback stopped");
        this.emit(':responseReady');
    }
};

module.exports = audioEventHandlers;