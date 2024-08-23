import Sidebar from './components/Sidebar.jsx'
import Menu from './components/Menu.jsx'
import MyModal from './components/MyModal.jsx'
import MyModalEdit from './components/MyModalEdit.jsx'
import { useEffect,useState} from 'react'
import axios from 'axios';

function App() {

  const fetchAPI=async()=>{
    const respone =await axios.get("http://127.0.0.1:8080/test");
  }

  useEffect(()=>{
    fetchAPI ()
  },[])



  return (
    <>
  <Sidebar/>
  <Menu/>
  <MyModal/>
  <MyModalEdit/>
  </>
  )
}

export default App
