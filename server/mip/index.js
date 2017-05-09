var wowweemip = require("wowweemip");
var mipFinder = new wowweemip.Finder();

mipFinder.scan(function(err, robots) {
  if (err != null) {
    console.log(err);
    return;
  }

  //connect to first mip
  var selectedMip = robots[0];
  mipFinder.connect(selectedMip, function(err) {
    if (err != null) {
      console.log(err);
      return;
    }

    console.log("connected");

    //move toward
    selectedMip.driveDistanceByCm(20, 0, function(err) {
      console.log("moving toward");
    });
  });
});
