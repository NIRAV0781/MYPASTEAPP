import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from "./Components/Home"
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'

const route = createBrowserRouter(
  [
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/pastes",
      element:<><Navbar/><Paste/></>
    },
    {
      path:"/viewpaste",
      element:<><Navbar/><ViewPaste/></>
    },
    {
      path:"/pastes/:id",
      element:<><Navbar/><ViewPaste/></>
    },
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
