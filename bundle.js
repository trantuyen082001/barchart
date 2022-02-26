(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var csvUrl =
      'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
    

  var useData = function () {
      var ref = React$1.useState(null);
      var data = ref[0];
      var setData = ref[1];
    
      React$1.useEffect(function () {
        var row = function (d) {
          d.Population = +d['2020'];
          return d;
        };
        d3.csv(csvUrl, row).then(function (data) {
          setData(data.slice(0, 10));
        });
      }, []);
      return data;
    };

  var AxisBottom = function (ref) {
    var xScale = ref.xScale;
    var innerHeight = ref.innerHeight;

    return xScale.ticks().map(function (tickValue) { return (
    React.createElement( 'g', { className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") }, 
      React.createElement( 'line', { y2: innerHeight }), 
      React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + 3 }, 
          tickValue
      )
    )
  ); });
  };

  var AxisLeft = function (ref) {
          var yScale = ref.yScale;

          return yScale.domain().map(function (tickValue) { return (
        React.createElement( 'g', { className: "tick" }, 
          React.createElement( 'text', { 
            key: tickValue, style: {textAnchor: 'end'}, dy: ".32em", x: -3, y: yScale(tickValue) + yScale.bandwidth() }, 
              tickValue
          )
        )
  ); });
  };

  var Marks = function (ref) {
          var data = ref.data;
          var xScale = ref.xScale;
          var yScale = ref.yScale;
          var xValue = ref.xValue;
          var yValue = ref.yValue;

          return data.map(function (d) { return (
      React.createElement( 'rect', {
          className: "mark", key: yValue(d), x: 0, y: yScale(yValue(d)), width: xScale(xValue(d)), height: yScale.bandwidth() })
      ); });
  };

  var width = 960;
    var height = 500;
    var margin = { top: 20, right: 30, bottom: 65, left: 220 };
    var xAxisLabelOffset = 50;

    var App = function () {
      var data = useData();
      
    
      if (!data) {
        return React__default["default"].createElement( 'pre', null, "Loading..." );
      }
    
      console.log(data[0]);

      var innerHeight = height - margin.top - margin.bottom;
      var innerWidth = width - margin.left - margin.right;
    
      var yValue = function (d) { return d.Country; };
      var xValue = function (d) { return d.Population; };

      var yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);
    
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);
    
      return (
        React__default["default"].createElement( 'svg', { width: width, height: height }, 
          React__default["default"].createElement( 'g', { transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") }, 
            React__default["default"].createElement( AxisBottom, { xScale: xScale, innerHeight: innerHeight }), 
            React__default["default"].createElement( AxisLeft, { yScale: yScale }), 
            React__default["default"].createElement( 'text', {
              className: 'axis-label', x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" }, "Population"), 
            React__default["default"].createElement( Marks, { 
              data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue })
          )
        )
      );
    };
    var rootElement = document.getElementById('root');
    ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3);
//# sourceMappingURL=bundle.js.map
