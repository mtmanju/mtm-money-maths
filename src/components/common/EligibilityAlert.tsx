import React from 'react';
import { Alert } from '@mui/material';

interface EligibilityAlertProps {
  message: string;
  severity?: 'warning' | 'info' | 'error' | 'success';
}

const EligibilityAlert: React.FC<EligibilityAlertProps> = ({ message, severity = 'warning' }) => (
  <Alert severity={severity} sx={{ mb: 2, fontWeight: 600, fontFamily: 'inherit' }}>
    {message}
  </Alert>
);

export default EligibilityAlert; 