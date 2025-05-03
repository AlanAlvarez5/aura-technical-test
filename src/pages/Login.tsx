import { useContext } from "react";
import AuthForm from "../components/auth/Form";
import { Auth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import logo from '../assets/logo/white-logo.png';

export default function Login() {
  const navigate = useNavigate()
  const auth = useContext(Auth);

  const handleSubmit = async (email: string, password: string) => {
    try {
      auth.login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert('Invalid credentials');
    }
  }
  return (
    <>
      <img
        src={logo}
        alt="Logo"
        style={{
          position: 'absolute',
          top: 22,
          left: 37,
          width: 'auto',
          height: '64px',
        }}
      />
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1B093C',
        }}
      >
        <Title level={1} style={{ color: 'white', fontFamily: 'Inter' }}>
          Welcome
        </Title>
        <AuthForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}