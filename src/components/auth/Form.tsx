import { useState } from "react";
import { Input, Button, Typography } from "antd";
import { isValidEmail } from "../../utils/Validations";


interface AuthFormProps {
  readonly onSubmit: (user: string, password: string) => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ user: string; password: string }>({ user: '', password: '' });

  const handleSubmit = () => {
    if (!isValidEmail(email) || !password) {
      setErrors({
        user: !isValidEmail(email) ? 'Invalid email' : '',
        password: !password ? 'Invalid password' : '',
      });
      return;
    }

    setErrors({ user: '', password: '' });
    onSubmit(email, password);
  };

  return (
    <div style={{ marginTop: 48, width: 320, display: 'flex', flexDirection: 'column' }}>
      <Typography.Text strong style={{ fontSize: 14, color: 'white', marginBottom: 8 }}>
        User
      </Typography.Text>
      <Input
        style={{
          height: 48,
          borderRadius: 6,
          backgroundColor: 'white',
          marginBottom: errors.user ? 0 : 16
        }}
        value={email}
        status={errors.user ? 'error' : ''}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.user && (
        <Typography.Text type="danger" style={{ marginBottom: 16 }}>
          {errors.user}
        </Typography.Text>
      )}

      <Typography.Text strong style={{ fontSize: 14, color: 'white', margin: '32px 0 8px' }}>
        Password
      </Typography.Text>
      <Input.Password
        style={{
          height: 48,
          borderRadius: 6,
          backgroundColor: 'white',
          marginBottom: errors.password ? 0 : 16
        }}
        value={password}
        status={errors.password ? 'error' : ''}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <Typography.Text type="danger" style={{ marginBottom: 16 }}>
          {errors.password}
        </Typography.Text>
      )}

      <Button
        type="primary"
        size="large"
        disabled={!email || !password}
        onClick={handleSubmit}
        style={{
          marginTop: 32,
          height: 50,
          width: '100%',
          backgroundColor: '#2D3648',
          fontWeight: 'bold',
          fontSize: 18,
          textTransform: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        Continue
      </Button>
    </div>
  );
}