describe('create-url test', function() {
    it('should return proper url given lat and lon', function() {
        var latitude = -33.857;
        var longitude = 151.215;

        var url = createURL(latitude, longitude);

        expect(url).to.be.eql('https://maps.google.com?q=-33.857,151.215');
    });

    it('should return proper url given another lat and lon', function() {
        var latitude = 37.826;
        var longitude = -122.423;

        var url = createURL(latitude, longitude);

        expect(url).to.be.eql('https://maps.google.com?q=37.826,-122.423')
    });
});
