'use strict';

var Alexa = require('alexa-sdk');
var radioData = require('./liveStreams');
var controller = require('./audioController.js');
var Msg = require('./strings.js');
var selectedLocation = '';


var intentHandlers = {
    'LaunchRequest': function () {
        this.response.speak(this.t(Msg.WELCOME_MSG,{skillName:radioData.title})).listen();
        this.emit(':responseReady');
    },
    'ListStations': function () {
           let request = this.event.request;
           let intentLoc = request.intent.slots.location.value;
           selectedLocation = intentLoc;
           let channelString = '';
           let channelCount = 0;
           let locations = '';
           radioData.channeldata.forEach(function(areaData) {
                locations += ' <break time="400ms"/> ' + areaData.location.toLowerCase();
                if(areaData.location.toLowerCase() == intentLoc.toLowerCase()) {
                    let channelData = areaData.channels;
                    channelData.forEach(function(channel) {
                       channelCount++;
                       channelString += '<break time="400ms"/> ' + channel.name;
                    });
                }
            });
           if(channelCount > 0) {
              this.response.speak('Listing ' + channelCount + ' channels <break time="400ms"/> ' + channelString).listen(); 
           } else {
              this.response.speak(this.t(Msg.LOCATION_UNAVAILABLE_MSG) + locations).listen();
           }
           this.emit(':responseReady');
    },
    'PlayAudio': function () {
            let request = this.event.request;
            let stationName = request.intent.slots.station.value;
            let ME = this;
            let noMatch = true;
            if(selectedLocation){
                radioData.channeldata.forEach(function(areaData) {
                if(areaData.location.toLowerCase() == selectedLocation.toLowerCase()) {
                    let channelData = areaData.channels;
                    channelData.forEach(function(channel) {
                       if(channel.name.toLowerCase() == stationName.toLowerCase()) {
                           noMatch = false;
                           controller.play.call(ME, "playing from station " + stationName, channel.url, null);
                       }
                    });
                }
            });
            } else {
               this.response.speak(this.t(Msg.SELECT_LOCATION_MSG)).listen();
               this.emit(':responseReady'); 
            }
            if(noMatch){
                this.emit('Unhandled');
            }
    },
    'System.ExceptionEncountered': function () {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(this.event.request, null, 2));
        this.response.speak(this.t(Msg.UNHANDLED_MSG)).listen();
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak(this.t(Msg.UNHANDLED_MSG)).listen();
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(this.t(Msg.HELP_MSG)).listen();
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.PauseIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        controller.stop.call(this, this.t(Msg.STOP_MSG));
    },
    'PauseCommandIssued': function () {
        controller.stop.call(this, this.t(Msg.STOP_MSG))
    }
};

module.exports = intentHandlers;