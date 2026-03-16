import Navbar from "./components/layout/Navbar"

const App = () => {
  return (
    <div className="min-h-screen bg-white">


<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='10' 
      numOctaves='1' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>
      <Navbar />
      <main>
          {/* Your main content goes here */}
      </main>
      <footer>
        {/* Your footer content goes here */}
      </footer>
      
    </div>
  )
}

export default App