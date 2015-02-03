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

React.render(
  <Weeks data={{startDate: new Date(), endDate: new Date(Date.now() + 17 * 24 * 3600 * 1000) }}/>,
  document.getElementById("weeks")
);

})(React, this);
