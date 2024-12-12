import './App.css'
import { Route, Routes } from "react-router-dom";
import MainLayout from './pages/MainLayout';
// import '../src/assets/css/font.css'
import Collection from './pages/Public/Components/Collection'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='/' element={<Collection />} />
        </Route>
      </Routes>
    </>
  )
}
