import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Grid, TextField } from '@mui/material';
import upiqr from 'upiqr';

const UPI = ({ upiOptions }) => {
  const [upi, setUpi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    upiqr({
      payeeVPA: upiOptions.payeeVPA,
      payeeName: upiOptions.payeeName,
      amount: upiOptions.amount,
      transactionNote: upiOptions.note,
      transactionRefUrl: upiOptions.transactionRefUrl,
      transactionRef: upiOptions.transactionRef,
      payeeMerchantCode: upiOptions.payeeMerchantCode,
      minimumAmount: upiOptions.minimumAmount,
      currency: upiOptions.currency,
      transactionId: upiOptions.transactionId,
    })
      .then((upi) => {
        console.log(upi.qr);
        console.log(upi.intent);
        setUpi(upi);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, [upiOptions]);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">Error generating UPI QR Code: {error.message}</Typography>
      </Box>
    );
  }

  if (!upi) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      border={1}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
      m={2}
      boxSizing="border-box"
      width="100%"
      maxWidth="600px"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <img src={upi.qr} alt="UPI QR Code" style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="body1" style={{ color: 'black', marginBottom: '10px' }}>
            Scan QR using Any UPI App
          </Typography>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            value={upiOptions.amount}
          />
          <a href={upi.intent}>
            <Button style={{ textDecoration: 'none', marginBottom: '10px', marginTop: '10px' }} variant="contained">Pay using UPI App</Button>
          </a>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UPI;