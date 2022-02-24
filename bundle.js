(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var csvUrl =
      'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
    
    var width = 960;
    var height = 500;
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    
    var App = function () {
      var ref = React.useState(null);
      var data = ref[0];
      var setData = ref[1];
    
      React.useEffect(function () {
        var row = function (d) {
          d.Population = +d['2020'];
          return d;
        };
        d3.csv(csvUrl, row).then(function (data) {
          setData(data.slice(0, 10));
        });
      }, []);
    
      if (!data) {
        return React__default["default"].createElement( 'pre', null, "Loading..." );
      }
    
      console.log(data[0]);

      var innerHeight = height - margin.top - margin.bottom;
    
      var yScale = d3.scaleBand()
        .domain(data.map(function (d) { return d.Country; }))
        .range([0, height]);
    
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.Population; })])
        .range([0, width]);
    
      return (
        React__default["default"].createElement( 'svg', { width: width, height: height }, 
          React__default["default"].createElement( 'g', { transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") }, 
            xScale.ticks().map(function (tickValue) { return (
              React__default["default"].createElement( 'g', { transform: ("translate(" + (xScale(tickValue)) + ",0)") }, 
                React__default["default"].createElement( 'line', { y2: innerHeight, stroke: "black" }), 
                React__default["default"].createElement( 'text', { y: innerHeight, style: {textAnchor: 'middle'}, dy: ".71em" }, 
                  tickValue)
              )
            ); }), 
            data.map(function (d) { return (
              React__default["default"].createElement( 'rect', {
              key: d.Country, y: yScale(d.Country), width: xScale(d.Population), height: yScale.bandwidth() })
              ); })
          )
        )
      );
    };
    var rootElement = document.getElementById('root');
    ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3);
//# sourceMappingURL=bundle.js.map
