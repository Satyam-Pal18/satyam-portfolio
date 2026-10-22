import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollTop from './components/ScrollTop'
import CustomCursor from './components/CustomCursor'

const Home     = lazy(() => import('./pages/Home'))
const About    = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const Contact  = lazy(() => import('./pages/Contact'))
const Resume   = lazy(() => import('./pages/Resume'))
const NotFound = lazy(() => import('./pages/NotFound'))

const routeTitles = {
  '/': 'Satyam Pal | Frontend Developer',
  '/about': 'About Me | Satyam Pal',
  '/projects': 'Projects & Work | Satyam Pal',
  '/services': 'Services & Expertise | Satyam Pal',
  '/resume': 'Resume & CV | Satyam Pal',
  '/contact': 'Contact Me | Satyam Pal',
}

function PageManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = routeTitles[pathname] || '404 Page Not Found | Satyam Pal'
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/resume"   element={<Resume />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PageManager />
      <CustomCursor />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <AnimatedRoutes />
      </Suspense>
      <Footer />
      <ScrollTop />
    </BrowserRouter>
  )
}
