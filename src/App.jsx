import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';




function App() {


  const [userData, setUserData] = useState(null);

  useEffect(()=> {
    if(localStorage.getItem("userToken")){
      saveUserData()
    }
  }, [])

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken")
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }

  let routers = createBrowserRouter([
    { path: "", element: <Layout userData={userData} setUserData={setUserData}/> , children: [
      {index:true , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"home" , element:<ProtectedRoute> <Home/> </ProtectedRoute> },
      {path:"movies" , element: <ProtectedRoute> <Movies/> </ProtectedRoute>},
      {path:"tvshow" , element:<ProtectedRoute> <Tvshow/> </ProtectedRoute> },
      {path:"people" , element: <ProtectedRoute> <People/> </ProtectedRoute>},
      {path:"moviedetails/:id/:mediaType" , element: <ProtectedRoute> <MovieDetails/> </ProtectedRoute>},
      {path:"login" , element: <Login saveUserData= {saveUserData}/>},
      {path:"register" , element: <Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])
  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
