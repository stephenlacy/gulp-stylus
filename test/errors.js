/*eslint-env node, mocha */
/*eslint quotes:[2, "single"], strict: 0*/
var path = require('path');

var should = require('should');
var gulp = require('gulp');
var stylus = require('../');

describe('when throw error', function(){
    it('should be processed as natural', function(done){
        var filepath = path.resolve(__dirname, './fixtures/incorrect.styl');
        gulp
            .src(filepath)
            .pipe(stylus())
            .on('error', function(err){
                err.should.be.instanceof(Error);
                err.name.should.be.equal('ParseError');
                err.message.should.startWith(filepath);
                done();
            });
    });
});