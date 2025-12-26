import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layouts/MainLayout'
import { Aboutus } from './pages/about/Aboutus'
import { Contact } from './pages/contact/Contact'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path="/" element={<MainLayout />} />
        <Route path="about" element={<Aboutus />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
