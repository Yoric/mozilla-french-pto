(function(React, exports) {
"use strict";

var $ = document.getElementById.bind(document);

console.log("main.js", "start");

React.render(
  <RangeList data={{kind: "css"}}/>,
  document.getElementById("ranges-rw")
);

React.render(
  <RangeList data={{readOnly: true, kind: "cp"}}/>,
  document.getElementById("ranges-ro")
);

})(React, this);
