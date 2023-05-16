import React, { useState } from 'react'
import { FormControl, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  callback:(genes:string)=>void;
  geneSymbols: string[];
  geneInfoMap: Map<string, string>;
}

export default function TrendsForm({callback, geneSymbols, geneInfoMap}:Props) {
  const [selectedGene, setSelectedGene] = useState<string>('');

  return (
    <>
      <FormControl>
        <Autocomplete
          id="multi-gene-selector"
          options={geneSymbols}
          value={selectedGene}
          onChange={(event, newValue) => {
            if (newValue===null) return
            setSelectedGene(newValue);
            callback(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // variant="outlined"
              label="Gene"
              placeholder="Select"
              style={{minWidth:"200px"}}
            />
          )}
          closeIcon={<CloseIcon onClick={()=>{
            setSelectedGene("TP53");
            callback("")
          }} />}
        />
      </FormControl>
    </>

  )
}


