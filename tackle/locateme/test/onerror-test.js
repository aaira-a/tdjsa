describe('onError test', function() {
    it('should set the error DOM element', function() {
        var domElement = {innerHTML: ''};
        sandbox.stub(document, 'getElementById')
            .withArgs('error')
            .returns(domElement);

        var message = "you're kidding";
        var positionError = {message: message};

        onError(positionError);

        expect(domElement.innerHTML).to.be.eql(message);
    });
});
