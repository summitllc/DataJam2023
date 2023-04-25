import React from 'react';
import { Modal, Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';

const LoadingPopUp = ({ close, open }) => {
  return (
    <Modal open={open} onClose={close} centered>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ width: 400, height: 100 }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              <div style={{ textAlign: 'center' }}>
                <p style={{ padding: '10px' }}> Loading Results...</p>
                <LinearProgress />                
              </div>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default LoadingPopUp;