(function(React, exports) {
"use strict";

var DateRange = React.createClass({
  displayName: "DateRange",
  render: function() {
    return (
      <div className="dateRange">
      <input className="datePicker"
        type="date"
        defaultValue={new Date()}
        data-format="'Starts on' yyyy-MM-dd"></input>
      <input className="datePicker"
        type="date"
        defaultValue={new Date()}
        data-format="'Ends on' yyyy-MM-dd"/>
      <input name={this.props.data.id} defaultChecked="true" type="radio">Congés payés</input>
      <input name={this.props.data.id} type="radio">Congés sans solde</input>
      <input name={this.props.data.id} type="radio">Jour férié</input>
      <input name={this.props.data.id} type="radio">RTT</input>
      <input name={this.props.data.id} type="radio">Anniversaire</input>
      <input name={this.props.data.id} type="radio">Arrêt maladie</input>
      </div>
    );
  }
});
exports.DateRange = DateRange;

var RangeList = React.createClass({
  displayName: "RangeList",
  getInitialState: function() {
    return {ranges: [
      {
        id: Math.random()
      }
    ]};
  },
  handleAdd: function() {
    // FIXME: This looks a bit too mutable
    this.state.ranges.push({id: Math.random()});
    this.setState(this.state);
  },
  handleRemove: function(id) {
    var length = this.state.ranges.length;
    var ranges2 = this.state.ranges.filter(function(x) { return x.id != id});
    if (ranges2.length == length) {
      console.log("handleRemove", "Nothing was removed");
      return;
    }
    this.state.ranges = ranges2;
    this.setState(this.state);
  },
  render: function() {
    var self = this;
    return (
      <div>
      {
        this.state.ranges.map(function (range) {
          var id = range.id;
          return (
            <div key={id}>
            <DateRange data={range}/>
            <input type="button" readOnly="true" value="Remove" onClick={
              function() { self.handleRemove(id) }
              }/>
            </div>
          );
        })
      }
      <input type="button" value="Add" readOnly="true" onClick={this.handleAdd}/>
      </div>
    );
  }
});
exports.RangeList = RangeList;

})(React, this);
