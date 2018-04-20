'use strict';

var controller = function () {
    return {
        play: function (text, url, cardData) {
            if (text && text !== "") {
                this.response.speak(text).audioPlayerPlay('REPLACE_ALL', url, url, null, 0).listen();
            } else {
                this.response.audioPlayerPlay('REPLACE_ALL', url, url, null, 0).listen();
            }
            this.emit(':responseReady');
        },
        stop: function (text) {
            this.response.speak(text).audioPlayerStop();
            this.emit(':responseReady');
        }
    };
}();

module.exports = controller;