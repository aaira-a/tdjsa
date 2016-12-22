describe('locate test', function() {
    it('should register handlers with getCurrentPosition', function(done) {

        var original = navigator.geolocation.getCurrentPosition;

        navigator.geolocation.getCurrentPosition = function(success, error) {
            expect(success).to.be.eql(onSuccess);
            expect(error).to.be.eql(onError);
            done();
        };

        locate();
        navigator.geolocation.getCurrentPosition = original;
    });
});