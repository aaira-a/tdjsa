var createURL = function (latitude, longitude) {
    if (latitude && longitude) {
        return 'https://maps.google.com?q=' + latitude + ',' + longitude;  
    }
    else {
        return '';
    }
    
};
