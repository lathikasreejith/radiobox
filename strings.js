'use strict';

let Messages = {
    "WELCOME_MSG": "Welcome to {{ skillName }}. You can select location for playing radio by saying <break time='400ms'/> list at location name <break time='400ms'/> and you can select the station by saying <break time='400ms'/> play from station name.",
    "LOCATION_UNAVAILABLE_MSG": "Sorry, we do not support this location yet. We are in the process of adding new locations and will be updated frequently. For now, please tune into one of the supported locations. ",
    "UNHANDLED_MSG" : "Sorry, I could not understand what you've just said",
    "STOP_MSG" : "Goodbye <break time='400ms'/> have a nice day.",
    "SELECT_LOCATION_MSG" : "Please select a location for radio station",
    "HELP_MSG" : "Please select location for playing radio by saying <break time='400ms'/> list at location name <break time='400ms'/> and you can select the station by saying <break time='400ms'/> play from station name."
};

module.exports = Messages;