'use strict';

let en = {
    card : {
        title: 'radiobox',
        subtitle: 'radiobox'
    },
    url: ''    
};

let globalAudioData = {
    'en-US': en,
    'en-IN': en
};

function audioData(request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request === undefined ? DEFAULT_LOCALE : request.locale;
    if (locale === undefined) { 
        locale = DEFAULT_LOCALE;
    }
    return globalAudioData[locale];    
}

module.exports = audioData;