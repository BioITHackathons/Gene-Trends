import React, { useEffect, useState } from 'react'
import Ideogram from 'ideogram';

type Props = {
  genes: string[]; // a list of gene symbols
}

/** Handle clicks on Ideogram annotations */
function onClickAnnot(this: {
    container: string; organism: string; chrWidth: number; chrHeight: number; chrLabelSize: number; annotationHeight: number; onClickAnnot: (annot: any) => void;
    // onPlotRelatedGenes,
    // onWillShowAnnotTooltip,
    showGeneStructureInTooltip: boolean; showProteinInTooltip: boolean; showParalogNeighborhoods: boolean; onLoad(): void;
  }, annot: any) {
  // Ideogram object; used to inspect ideogram state
  const ideogram = this // eslint-disable-line


}

const defaultIdeoConfig = {
  container: '#trends-ideogram',
  organism: 'homo-sapiens',
  chrWidth: 9,
  chrHeight: 100,
  chrLabelSize: 12,
  annotationHeight: 7,
  onClickAnnot,
  // onPlotRelatedGenes,
  // onWillShowAnnotTooltip,
  showGeneStructureInTooltip: true,
  showProteinInTooltip: true,
  showParalogNeighborhoods: true,
  onLoad() {

    const mw : any = document.querySelector('#_ideogramMiddleWrap')
    mw.style.width = '1200px';

    const iw : any = document.querySelector('#_ideogramInnerWrap')
    iw.style.maxWidth = null;

    const ideoEl : any = document.querySelector('#_ideogram')
    ideoEl.style.left = '170px';

    // Handles edge case: when organism lacks chromosome-level assembly
    // if (!genomeHasChromosomes()) {return}
    // this.plotRelatedGenes(gene)
    // showRelatedGenesIdeogram(target)
  }
}

let staticIdeogram: any = null;

export default function TrendsIdeogram({genes}: Props) {

  const [ideoConfig, setIdeoConfig] = useState(defaultIdeoConfig)


  let ideogram = Ideogram.initRelatedGenes(ideoConfig)

  useEffect(() => {

    if (staticIdeogram) {
      console.log('genes[0]', genes[0])
      staticIdeogram.plotRelatedGenes(genes[0])
      console.log('static ideogram', staticIdeogram)
      console.log('staticIdeogram.geneCache', staticIdeogram.geneCache)
    } else {
      staticIdeogram = ideogram
    }

  }, [genes])

  return (
    <>
      <div
        id="trends-ideogram"
        style={{'position': 'relative', 'left': '300px'}}
      ></div>


    </>
  )
}
