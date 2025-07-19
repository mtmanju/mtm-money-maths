import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, title = 'Frequently Asked Questions', collapsible = false, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: collapsible ? 'pointer' : 'default', mb: 1 }} onClick={collapsible ? () => setOpen(o => !o) : undefined}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00bfc6', flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          {title}
        </Typography>
        {collapsible && (
          <IconButton
            size="small"
            onClick={e => {
              e.stopPropagation();
              setOpen(o => !o);
            }}
          >
            <ExpandMoreIcon sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </IconButton>
        )}
      </Box>
      <Collapse in={!collapsible || open}>
        <Box sx={{ mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: 'inherit' }}>
          {faqs.map((item, idx) => (
            <Box key={item.q} sx={{ mb: idx !== faqs.length - 1 ? 2.5 : 0 }}>
              <Typography variant="body2" sx={{ color: '#00bfc6', fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
              <Typography variant="body2" sx={{ color: '#4E5D78', fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
              {idx !== faqs.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FAQSection; 