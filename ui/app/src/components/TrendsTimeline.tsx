import { randomNormal, randomUniform, range, schemeTableau10 } from 'd3'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { genericType } from '../utils/dataUtils'

type Props = {
  genes:string[] // a list of gene symbols
}

const dateFormatter = (time: string | number): string => {
  const date = new Date(time);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

export default function TrendsTimeline({genes}: Props) {
  let vizData = randomDataGenerator(genes)
  let colorTheme = schemeTableau10;
  return (
    <LineChart width={1000} height={300} data={vizData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={dateFormatter}/>
      <YAxis/>
      <Tooltip labelFormatter={dateFormatter}/>
      <Legend />
      {genes.map((g, i)=>{
        return <Line type="monotone" dataKey={g} name={g} stroke={colorTheme[i]} activeDot={{ r: 1 }} />
      })}
     
    </LineChart>
  )
}

function randomDataGenerator(glist:string[]){
  let randomData:any[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date();
  const millisecondsPerDay: number = 1000 * 60 * 60 * 24;

  const days = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
  console.log(glist); 

  let date = startDate;

  range(days-1).forEach((day)=>{
    console.log(date.getDate())
    let theDate = new Date(date.toDateString())
    let data = {
      date: theDate
    }
    let geneData:genericType = {}
    glist.forEach((g)=>{
      let seed = randomUniform(10, 100)();
      geneData[g] = Math.round(randomNormal(seed, seed*0.1)())
    })
    randomData.push(Object.assign({}, data, geneData))
    date.setDate(date.getDate() + 1);
    
  })

  console.log(randomData)
  return randomData
}