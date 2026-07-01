import './App.css'
import NavBar from './componant/NavBar'
import HeroSection from './componant/HeroSection'
import Catagory from './componant/Catagory'
import ProductSection from './componant/ProductSection'
import SocialSection from './componant/SocialCard'
import Footer from './componant/Footer'
import { useState } from 'react'

function App() {
  const [activeCategory, setActiveCategory] = useState('');

  return (
   <>
    <NavBar/>
    <HeroSection/>
    <Catagory 
      activeCategory={activeCategory} 
      setActiveCategory={setActiveCategory}
      />
      <ProductSection activeCategory={activeCategory}/>
      <SocialSection/>
      <Footer/>
   </>
  )
}

export default App
