import { Auth } from './context/Auth'
import { lazy, Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Private from './components/auth/Private'
import Drawer from './components/shared/Drawer.tsx';

const Login = lazy(() => import("./pages/Login.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const AuraAi = lazy(() => import("./pages/AuraAi.tsx"));

function App() {


  const { isLoggedIn } = useContext(Auth);

  return (
    <div style={{display: 'flex', padding: '0' }}>
      {isLoggedIn && <Drawer />}
      <div style={{ flex: 1 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Private />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aura-ai" element={<AuraAi />} />
                <Route path="*" element={<h3>404 - Page not found!</h3>} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
