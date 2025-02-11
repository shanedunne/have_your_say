import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';


function NoOfDaysSelect({value, onChange, label}) {
 
  function createDayOptions() {
    let dayOptions = [];
    for(let i = 7; i <= 28; i++) {
        dayOptions.push(<MenuItem key={i} value={i}>{i} days to vote</MenuItem>)
    }
    return dayOptions;
}

    const customPaperProps = {
        PaperProps: {
          style: {
            maxHeight: 200,
            overflow: 'auto',
          },
        },
      };
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(event) => onChange(event.target.value)}
          MenuProps={customPaperProps}
          >
          {createDayOptions()}
        </Select>
      </FormControl>
    </Box>
  );
}

NoOfDaysSelect.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default NoOfDaysSelect;