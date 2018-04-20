'use strict';

var alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./intentHandlers');
var audioEventHandlers = require('./audioEventHandlers');
var languageStrings = require('./strings');

exports.handler = (event, context, callback) => {
    
    var skill = alexa.handler(event, context, callback);

    skill.appId = constants.appId;
    skill.resources = languageStrings;
    skill.debug = constants.debug;
    skill.registerHandlers(
        stateHandlers,
        audioEventHandlers
    );

    skill.execute();
};