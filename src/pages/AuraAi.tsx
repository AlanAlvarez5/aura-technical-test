import { Input, Button, Typography, Card, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAIApiClient from '../utils/OpenAIApiClient';

const { Title, Paragraph } = Typography;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function AuraAi() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAskAura = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: 'user' as const, text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt('');

    try {
      const chatMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.text
      }));

      chatMessages.push({
        role: 'user',
        content: prompt
      });

      const response = await OpenAIApiClient.createChatCompletion(chatMessages);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: response.outputText }
      ]);
    } catch (error) {
      console.error('Error al comunicarse con OpenAI:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Lo siento, tuve un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: 'calc(100vw - 104px)', height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
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

      <div style={{ flex: 1, padding: 24, background: 'white', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Card
            key={index}
            style={{
              fontSize: 14,
              marginBottom: 12,
              backgroundColor: msg.role === 'user' ? '#f0f0f0' : 'white',
              borderLeft: msg.role === 'assistant' ? '4px solid #6f42c1' : 'none'
            }}
          >
            <Paragraph>{msg.text}</Paragraph>
          </Card>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin tip="Aura está pensando..." />
          </div>
        )}
      </div>

      <div style={{ padding: 12, background: 'white' }}>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onPressEnter={handleAskAura}
          placeholder="Hi, I'm Aura, your AI Assistant. Tell me, what question do you have?"
          size="large"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}