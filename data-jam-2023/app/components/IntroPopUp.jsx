import React from 'react';
import { Modal, Box, Card, CardContent, Typography, Button } from '@mui/material';

const IntroPopUp = ({ handlePopUpClose, open }) => {
  return (
    <Modal open={open} onClose={handlePopUpClose} centered>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ width: 500, height: 500 }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              <div style={{ textAlign: 'center' }}>
                <h1>Example Header Title</h1>
                <h2>How this website works:</h2>
                <p style={{ margin: '10px' }}>First check out X.</p>
                <p style={{ margin: '10px' }}>Then see Y.</p>
                <p style={{ margin: '10px' }}>Finally see the results!</p>
                <Button variant="contained" onClick={handlePopUpClose}>Get Started!</Button>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default IntroPopUp;