(function(React, exports) {
"use strict";

var $ = document.getElementById.bind(document);

console.log("main.js", "start");

React.render(
  <RangeList/>,
  document.getElementById("ranges")
);

})(React, this);
