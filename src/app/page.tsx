'use client';

import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { CONVERSION_MAP, LetterNumber, convert } from './converter';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled('textarea')(
  ({ theme }) => `
  width: 100%;
  box-sizing: border-box;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  resize: none;
  line-height: 1.5;
  min-height: 8rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


export default function Main() {
  let [val, setVal] = useState({
    text: '',
    setLetterNumber: 0,
    convertedText: ''
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 m-auto max-w-screen-sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            Simple Decryptor
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Textarea
            placeholder="Write your text here..."
            onChange={(evt) => setVal(prevVal => {
              let text = evt.target.value;
              let { setLetterNumber } = prevVal;
              let convertedText = convert(text, setLetterNumber as LetterNumber);
              return {
                text,
                setLetterNumber,
                convertedText
              }
            })} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="set-number-label">Set Letter</InputLabel>
            <Select
              labelId="set-number-label"
              id="set-number-select"
              value={val.setLetterNumber}
              label="Set Letter"
              className="w-full"
              onChange={(evt) => setVal(prevVal => {
                let setLetterNumber = evt.target.value as LetterNumber;
                let { text } = prevVal;
                let convertedText = convert(text, setLetterNumber as LetterNumber);
                return {
                  text,
                  setLetterNumber,
                  convertedText
                }
              })}
            >
              {Object.keys(CONVERSION_MAP)
                .map(v => parseInt(v, 10))
                .sort((a, b) => a - b)
                .map(num => (<MenuItem key={num} value={num}>{String.fromCharCode(num + 65)}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Converted Text
              </Typography>
                {val.convertedText ?
                  val.convertedText.split("\n").map((text, idx) => (<span key={idx} className="block">{text}</span>)) :
                  (<Typography variant='body2' className="italic" color='text.secondary'>No Text Yet...</Typography>)}
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  )
}
