export const AxisLeft = ({yScale}) => 
    yScale.domain().map(tickValue => (
      <g className="tick">
        <text 
          key={tickValue} 
          style={{textAnchor: 'end'}} 
          dy=".32em"
          x={-3}
          y={yScale(tickValue) + yScale.bandwidth()}>
            {tickValue}
        </text>
      </g>
));
