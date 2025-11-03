import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import Badges from './pages/Badges'
import Admin from './pages/Admin'
import { Navbar } from './components/Navbar'
import CourseDetail from './pages/CourseDetail'
import Tracks from './pages/Tracks'
import TrackDetail from './pages/TrackDetail'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen bg-pms-000c data-[theme=dark]:bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/tracks/:id" element={<TrackDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="mt-10 py-6 border-t border-pms-2165/30 data-[theme=dark]:border-pms-425/40">
        <div className="container mx-auto px-4 text-sm text-pms-425 data-[theme=dark]:text-pms-000c/80">
          <span className="font-semibold text-pms-2965 data-[theme=dark]:text-pms-123">SkillTrack</span> · Ilolo Izu Development 2025 · All Rights Reserved
        </div>
      </footer>
    </div>
  )
}

export default App
