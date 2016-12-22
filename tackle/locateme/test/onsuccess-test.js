describe('onSuccess test', function() {
    it('should call createURL with latitude and longitude', function() {
        var createURLSpy = sandbox.spy(window, 'createURL');

        var position = {coords: {latitude: 40.41, longitude: -105.55}};

        onSuccess(position);

        expect(createURLSpy).to.have.been.calledWith(40.41, -105.55);
    });
});
