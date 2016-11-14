
function stairInit(x, y, w, h) {
    // Init
    var stair = background.create(x, y, 'stairs');
    stair.height = h;
    stair.width = w;

    world.putTile(0, layer.getTileX(x), layer.getTileY(y), layer);
    return stair;
}

function stairUpdate() {
    // Update
}


// See Javascript Prototype Recipe below:

// Classname=function (...) {
//      parentClass.call (...)
//      ..
//}
//Classname.prototype=
//  object.create(parentClass.prototype);
//Classname.prototype.constructor=Classname;
//
//Classname.prototype.funcname = function (...) {
//  ..
//}
//
//fred = new Classname(..);