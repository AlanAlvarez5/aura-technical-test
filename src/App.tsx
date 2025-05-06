import { Auth } from './context/Auth'
import { lazy, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Private from './components/auth/Private'
import Drawer from './components/shared/Drawer.tsx';
import NotFound from './pages/NotFound.tsx';

const Login = lazy(() => import("./pages/Login.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const AuraAi = lazy(() => import("./pages/AuraAi.tsx"));

function App() {


  const { isLoggedIn } = useContext(Auth);

  return (
    <div style={{display: 'flex'}}>
      {isLoggedIn && <Drawer />}
      <div style={{ flex: 1, marginLeft: isLoggedIn ? '104' : 0}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Private />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/aura-ai" element={<AuraAi />} />
              <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
