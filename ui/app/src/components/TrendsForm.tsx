import React, { useState } from 'react'
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

type Props = {
  callback:(genes:string[])=>void;
  geneSymbols: string[];
  geneInfoMap: Map<string, string>;
}

export default function TrendsForm({callback, geneSymbols, geneInfoMap}:Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <>
      <FormControl>
        <Autocomplete
          multiple
          id="multi-gene-selector"
          options={geneSymbols}
          value={selectedOptions}
          onChange={(event, newValue) => {
            setSelectedOptions(newValue);
            callback(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // variant="outlined"
              label="Genes"
              placeholder="Select"
            />
          )}
        />
      </FormControl>
    </>

  )
}


