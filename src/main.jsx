import { createRoot } from 'react-dom/client'
import '@mui/material/styles/styled';
import App from './App'
import './index.css'
import "@fontsource/poppins";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
