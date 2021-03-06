import React, {useState,useEffect} from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

/* A Component which dynamically shows data from attribute clicked on 
to be displayed as a chart */

const  DynamicChart = ({displayGraphData}) => {

    
      
  
  

    

    useEffect( () => {

        
        },[displayGraphData]);

    const dataToShow = (graphData) => {

          if(graphData == undefined ){return []}
          var Multiple = [];
          var count = 0;
          graphData.forEach(element => {
              
              if(count%100 == 0){Multiple.push(element)}
              count++
            })
            
          
          console.log(Multiple)
          return Multiple

    }


   
    

    const findMinMax = (graphData) => {
       var minX = 0;
       var maxX; 
       var minY;
       var maxY;
       var XARR = [];
       var YARR = []
       dataToShow(graphData).forEach(element => {
            element.forEach((el)=> {
                XARR.push(el.x);
                YARR.push(el.y);   
            })
               
           })
           maxX = Math.max(...XARR);
           minX = Math.min(...XARR);

           maxY = Math.max(...YARR);
           minY = Math.min(...YARR);
           return [[minX-1,maxX+1],[minY-1,maxY+1]]
       }

      

    return (
      <div className="GraphContainer">
        <ScatterChart
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid style={{color: "wheat"}}/>   
        <XAxis type="number" dataKey={"x"} name="" unit="" domain={findMinMax(displayGraphData)[0]}  />
        <YAxis type="number" dataKey={"y"} name="" unit=""  domain={findMinMax(displayGraphData)[1]}/>
        <ZAxis range={[50]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
         <Scatter  name="Attribute I" data={dataToShow(displayGraphData[0])} fill="blue" line shape="circle" />
         <Scatter  name="Attribute II" data={dataToShow(displayGraphData[1])} fill="purple" line shape="circle" />
         <Scatter  name="Attribute III" data={dataToShow(displayGraphData[2])} fill="orange" line shape="circle" />
      </ScatterChart>
    </div>
        
    );
}

export default DynamicChart;