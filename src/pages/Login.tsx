import { useContext, useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import AuthForm from "../components/auth/Form";
import { Auth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import logo from '../assets/logo/white-logo.png';

export default function Login() {
  const navigate = useNavigate()
  const auth = useContext(Auth);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await auth.signup(name, email, password);
      setIsModalVisible(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      alert('Error during sign up');
    }
  };

  const handleSubmit = async (email: string, password: string) => {
    try {
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert('Invalid credentials');
    }
  };
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
        <Button type="link" style={{ color: 'white', marginTop: 20 }} onClick={() => setIsModalVisible(true)}>
          Don't have an account? Sign up
        </Button>
        <Modal
          title="Sign Up"
          open={isModalVisible}
          onOk={handleSignup}
          onCancel={() => setIsModalVisible(false)}
          okText="Register"
        >
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email format' }
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}