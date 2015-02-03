(function(React, exports) {
"use strict";

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

var Weeks = React.createClass({
  displayName: "weeks",
  getBody: function() {
    var startDate = this.props.data.startDate;
    if (startDate.getDay() != 0) {
      startDate = new Date(startDate);
      startDate.setDate(startDate.getDate() - startDate.getDay());
    }
    var startDOY = startDate.getDOY();

    var endDate = this.props.data.endDate;
    if (endDate.getDay() != 6) {
      endDate = new Date(endDate);
      endDate.setDate(endDate.getDate() + 6 - endDate.getDay());
    }
    var endDOY = endDate.getDOY();

    var startWeek = startDate.getDOY() % 7;
    var numberOfWeeks = Math.ceil((endDOY - startDOY) / 7);

    console.log("Week", "getBody", startDOY, endDOY, startWeek, numberOfWeeks)
    var range = [];
    for (var i = 0; i < numberOfWeeks; ++i) {
      range.push(i);
    }
    var days = [0, 1, 2, 3, 4, 5, 6];
    return range.map(function(weekIndex) {
      return (
        <tr key={weekIndex}>
        <td>
          {/*Week#*/startWeek + weekIndex + 1}
        </td>
        {
          [0,1,2,3,4].map(function(dayIndex) {
            var doy = startDOY + weekIndex * 7 + dayIndex;
            var dayKind = (this.propsdata && this.props.data.days) ? this.props.data.days[doy] || "" : "";
            var className = dayKind == "" ? "regularDay" : dayKind;
            return <td key={doy} className={className}>{dayKind}</td>
          }.bind(this))
        }
        <td className="Week-end">
          WE
        </td>
        <td className="Week-end">
          WE
        </td>
      </tr>
    )}.bind(this));
  },
  render: function() {
    return (
      <table>
      <tr>
      <th>Week#</th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednseday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
      <th>Sunday</th>
      </tr>
      {
        this.getBody()
      }
      </table>
    );
  }
});
exports.Weeks = Weeks;

})(React, this);
