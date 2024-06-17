import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="bg-[url('/images/wallpaper2.avif')] bg-cover bg-no-repeat w-full h-screen">
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App
