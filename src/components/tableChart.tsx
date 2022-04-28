import React from "react";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";

type tableChartProps = {
    id1: string;
    id2: string;
    data1: any[];
    data2: any[];
  };

const tableChart: React.FunctionComponent<tableChartProps> = ({ id1, id2, data1, data2 }) => {
  return (
    <div className="tableChart">
      <h2>Data</h2>
      <div className="legend">
          <div className="identifiers">
            <div className="square1"></div>
            <p>{id1}</p>
          </div>
          <div className="identifiers">
            <div className="square2"></div>
            <p>{id2}</p>
          </div>
      </div>

        <VictoryChart 
            width={700}
            height={300}
            scale={{x: 'time'}}
        >
            <VictoryLine data={data1}
            style={{
                data: { stroke: "black" },
            }}/>
            <VictoryLine data={data2}
            style={{
                data: { stroke: "lightgray" }
            }} />
            <VictoryAxis 
            label={'time(in s)'}
            />
            <VictoryAxis dependentAxis
            tickValues={[0, 10, 20, 30, 40]}
            />
        </VictoryChart>
    </div>
  );
};

export default tableChart;