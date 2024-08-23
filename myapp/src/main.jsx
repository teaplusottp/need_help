import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


document.addEventListener("DOMContentLoaded", function() {
    localStorage.clear();  // Xóa toàn bộ dữ liệu trong localStorage
    console.log("đã xóa");
});
