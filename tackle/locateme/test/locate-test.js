describe('locate test', function() {
    it('should register handlers with getCurrentPosition', function() {
        var getCurrentPositionMock = sandbox.mock(navigator.geolocation)
            .expects('getCurrentPosition')
            .withArgs(onSuccess, onError);

        locate();
    });
});
