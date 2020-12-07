import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBoxDocumento() {
  return (
    <Autocomplete
      id="documento-combo-box"
      options={documentos}
      getOptionLabel={(option) => option.name}
      style={{ width: 500, padding: 20 }}
      autoHighlight={true}
      renderInput={(documentos) => <TextField {...documentos} label="Documento" variant="outlined" />}
    />
  );
}

const documentos = [
  { name: 'ORÇAMENTO POR PARTE SEGURADO DISCRIM.', value: 'ZISCMIR053' },
  { name: 'TCONTRATO SOCIAL, ESTATUTO, REQUER.(CÓPIA)', value: 'ZISCMIR108' },
  { name: 'FORMULÁRIO DE INFORMAÇÕES CADASTRAIS PJ', value: 'ZISCMIG069' },
  { name: 'LAUDO TÉCNICO', value: 'ZISCMIR051' }
];
