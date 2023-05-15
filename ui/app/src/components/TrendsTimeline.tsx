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
  let randomData = [];
  glist.forEach((g)=>{
    
  })
}