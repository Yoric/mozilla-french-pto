(function(React, exports) {
"use strict";

var DateRange = React.createClass({
  displayName: "DateRange",
  statics: {
    fields: {
      jn: {
        label: "Journée normale"
      },
      cp: {
        label: "Congés payés"
      },
      css: {
        label: "Congés sans soldes"
      },
      jf: {
        label: "Jour férié"
      },
      rtt: {
        label: "RTT"
      },
      av: {
        label: "Anniversaire"
      },
      am: {
        label: "Arrêt Maladie"
      }
    }
  },
  render: function() {
    var readOnly = !!(this.props.data && this.props.data.readOnly);
    var startDate = (this.props.data && this.props.data.startDate) || new Date();
    var endDate = (this.props.data && this.props.data.endDate) || new Date();
    return (
      <div className="dateRange">
      {
        readOnly
          ?<span className="dateLabel">Starts on {startDate.toDateString()}</span>
          :<input className="datePicker"
            type="date"
            defaultValue={new Date()}
            data-format="'Starts on' yyyy-MM-dd"></input>
      }
      {
        readOnly
          ?<span className="dateLabel">Ends on {endDate.toDateString()}</span>
          :<input className="datePicker"
            type="date"
            defaultValue={new Date()}
            data-format="'Ends on' yyyy-MM-dd"></input>
      }
      {
        Object.keys(DateRange.fields).map(function(k, i) {
          var attributes;
          console.log("Updating field", k, this.props.data);
          var checked = this.props.data && this.props.data.kind == k;
          if (readOnly) {
            attributes = {
              readOnly,
              checked
            }
          } else {
            attributes = {
              readOnly,
              defaultChecked: checked
            }
          }
          return <input key={i} name={this.props.data.id} type="radio" {...attributes}>{
              DateRange.fields[k].label
            }</input>
        }.bind(this))
      }
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
    console.log("RangeList.render", this.props);
    var self = this;
    var readOnly = !!(this.props.data && this.props.data.readOnly);
    return (
      <div>
      {
        this.state.ranges.map(function (data) {
          var options = {
            id: data.id,
            readOnly: readOnly,
            kind: self.props.data && self.props.data.kind,
          }
          return (
            <div key={data.id}>
            <DateRange data={options}/>
            <input disabled={readOnly} type="button" readOnly="true" value="Remove" onClick={
              function() { self.handleRemove(options.id) }
              }/>
            </div>
          );
        })
      }
      <input disabled={readOnly} type="button" value="Add" readOnly="true" onClick={this.handleAdd}/>;
      </div>
    );
  }
});
exports.RangeList = RangeList;

})(React, this);
