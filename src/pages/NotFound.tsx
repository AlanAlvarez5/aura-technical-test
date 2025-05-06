import { Typography} from "antd";

const { Title, } = Typography;

export default function NotFound() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Title level={3}>Not Found</Title>
    </div>
  );
}