import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { a11yProps, CustomTabPanel } from './CustomTabPanel';

export default function CustomTabs({ tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="custom tabs">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} sx={{ flexGrow: 1 }} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};
