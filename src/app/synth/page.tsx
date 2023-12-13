'use client'

import Knob from '../../components/Knob';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function Synth() {
  return (
    <Container>
      <Paper>
        <Box padding={1}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Paper>
                <Box
                  padding={1}
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Typography padding={1}
                    variant="h6">
                    Oscillator:
                  </Typography>
                  <Knob />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper >
                <Knob />
                <Typography
                  variant="h6">
                  Filter
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper>
                <Knob />
                <Typography
                  variant="h6">
                  Amp
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container >
  );
}
