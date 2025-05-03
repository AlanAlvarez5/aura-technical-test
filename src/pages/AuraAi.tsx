import { Input, Button, Typography, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function AuraAi() {
  const [prompt, setPrompt] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const navigate = useNavigate();

  const handleAskAura = () => {
    if (!prompt.trim()) return;

    setQuestion(prompt);
    setMessages(prev => [...prev, { text: lorem }]);
    setPrompt('');
  };

  return (
    <div style={{  width: '100vw', height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/dashboard')}
          type="text"
        >
          Return
        </Button>

        <Title level={3} style={{ margin: 0, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
          Aura Ai
        </Title>
      </div>

      <Title level={5} style={{ margin: 0, marginTop: 4, textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontFamily: 'Sansation' }}>
        {question}
      </Title>


      <div style={{ flex: 1, padding: 24, background: 'white', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
            <Card key={index} style={{ fontSize: 14, marginBottom: 12 }}>
              <Paragraph>{msg.text}</Paragraph>
            </Card>
          ))}
      </div>


      <div style={{ padding: 12, background: 'white' }}>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onPressEnter={handleAskAura}
          placeholder="Hi, I’m Aura, your AI Assistant. Tell me, what question do you have?"
          size="large"
        />
      </div>
    </div>
  );
}