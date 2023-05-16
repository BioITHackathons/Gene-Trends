import { randomNormal, randomUniform, range } from 'd3'
import React from 'react'

type Props = {
  genes:string[] // a list of gene symbols
}

export default function TrendsTimeline({genes}: Props) {
  let vizData = randomDataGenerator(genes)
  return (
    <div>TrendsTimeline</div>
  )
}

function randomDataGenerator(glist:string[]){
  let randomData:any[] = [];
  const startDate = new Date('2018-01-01');
  const endDate = new Date();
  const millisecondsPerDay: number = 1000 * 60 * 60 * 24;

  const days = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
  console.log(glist);


  let seed = randomUniform(10, 100)()
  glist.forEach((g)=>{
    let date = new Date('2018-01-01');

    range(days-1).forEach((day)=>{
      randomData.push({
        gene: g,
        date: date.toDateString(),
        cites: randomNormal(seed, seed*0.1)()
      })
      date.setDate(date.getDate() + 1);
    })
  })
}
