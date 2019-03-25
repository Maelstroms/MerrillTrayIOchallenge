var assert = require('assert');
var helperMethods = require('../modules/helperMethods.js')



describe('dontExceedRoomBoundaries', function (){
  describe('upperBound', function  () {
    it('should return the upperBound if coordinate is greater than boundary', function(){
      assert.equal(helperMethods.dontExceedRoomBoundaries(31,'x',5,5),5);
      assert.equal(helperMethods.dontExceedRoomBoundaries(31,'y',5,5),5);
    });
  });
  describe('LowerBound', function  () {
    it('should return the lowerBound if coordinate is greater than boundary', function(){
      assert.equal(helperMethods.dontExceedRoomBoundaries(-31,'x',5,5),0);
      assert.equal(helperMethods.dontExceedRoomBoundaries(-31,'y',5,5),0);
    });
  });
  describe('withinBounds', function  () {
    it('should return the vale if coordinate is vithin boundaries', function(){
      assert.equal(helperMethods.dontExceedRoomBoundaries(3,'x',5,5),3);
      assert.equal(helperMethods.dontExceedRoomBoundaries(3,'y',5,5),3);
    });
  });
});

describe('wasSpotCleaned',function(){
  var dirtpatches = [[1,2],[3,4],[2,2]];
  it('should return 1 if a spot was present in the spot list', function(){
    assert.equal(helperMethods.wasSpotCleaned([1,2], dirtpatches),1);
    assert.equal(helperMethods.wasSpotCleaned([3,4], dirtpatches),1);
    assert.equal(helperMethods.wasSpotCleaned([2,2], dirtpatches),1);
  });
  it('should return 0 if the coordinate was not present in the spot list', function(){
    assert.equal(helperMethods.wasSpotCleaned([5,7], dirtpatches),0);
  });
});


