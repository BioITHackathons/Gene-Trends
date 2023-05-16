
import { randomNormal, randomUniform, range, schemeTableau10, tsv } from 'd3'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { genericType } from '../utils/dataUtils'

type Props = {
  gene:string // a gene symbol
}

export default function TrendsTimeline({gene}: Props) {
  let colorTheme = schemeTableau10;
  let [plotData, setPlotData] = useState([])

  useEffect(()=>{
    let geneFile = `data/${gene}.tsv`;
    tsv(geneFile).then((input)=>{
      setPlotData(parsePlotData(input, gene))
    }).catch((error)=>{
      console.error(error)
    })
  },[gene])

  return (
    <LineChart width={700} height={400} data={plotData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={dateFormatter}/>
      <YAxis/>
      <Tooltip labelFormatter={dateFormatter}/>
      <Legend />
      <Line type="monotone" dataKey={gene} name={gene} stroke={colorTheme[0]} dot={false} />

    </LineChart>

  )
}

const dateFormatter = (time: string | number): string => {
  const date = new Date(time);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day} ${year}`;
};

function parsePlotData(input:any[], gene:string){
  let parsed = input.map((d)=>{
    let _d:genericType = {
      date: new Date(d.date)
    };
    _d[gene] = parseInt(d.cite)
    return _d
  })
  console.log(parsed)
  return parsed as never[]
}

// function randomDataGenerator(selectedGene:string){
//   let randomData:any[] = [];

//   const startDate = new Date('2022-11-01');
//   const endDate = new Date();
//   const millisecondsPerDay: number = 1000 * 60 * 60 * 24;

//   const days = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
//   let date = startDate;

//   range(days-1).forEach((day)=>{
//     // console.log(date.getDate())
//     let theDate = new Date(date.toDateString())
//     let data = {
//       date: theDate
//     }
//     let geneData:genericType = {}
//     let seed = randomUniform(10, 100)();
//     geneData[selectedGene] = Math.round(randomNormal(seed, seed*0.1)())
//     randomData.push(Object.assign({}, data, geneData))
//     date.setDate(date.getDate() + 1);

//   })

//   // console.log(randomData)
//   return randomData
// }
