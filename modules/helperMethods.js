
//method to calculate the number of spots cleaned
function wasSpotCleaned(coord, dirtPatches){
  // because arrays in JS don't compare contents
  // I had to create my own way to find the index of an element
  // in an array of arrays
  var patchIndex = dirtPatches.findIndex(function(element){
    if(element[0] == coord[0] && element[1] == coord[1]){
      return true;
    }
    else{
      return false;
    }
  });
  // if the element we are searching for exists,
  if(patchIndex > -1){
    // console.log(patchIndex);
    dirtPatches[patchIndex] = 0;
    // console.log(dirtPatches);
    return 1;
  }
  else{
    return 0;
  }
}

// method to prevent the hoover from leaving the defined boundaries of the room
function dontExceedRoomBoundaries(coord, axis, maxX, maxY){
  if(axis == 'x'){
    if(coord > maxX){
      return maxX;
    }
    else if(coord < 0){
      return 0;
    }
    else{
      return coord;
    }
  }
  else{
    if(coord > maxY){
      return maxY;
    }
    else if(coord < 0){
      return 0;
    }
    else{
      return coord;
    }
  }
}


module.exports= {
  wasSpotCleaned : wasSpotCleaned,
  dontExceedRoomBoundaries: dontExceedRoomBoundaries,
}
