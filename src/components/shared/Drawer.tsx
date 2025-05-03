import { Layout, Button } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo/white-drawer-logo.svg';
import imageIcon from '../../assets/icons/icon-image.svg';
import { Auth } from "../../context/Auth.tsx";

const { Sider } = Layout;

const IconGroup = ({ count }: { count: number }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={`icon-${count}-${index}`} style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={imageIcon} alt="Icon" style={{ width: 24, height: 24 }} />
        </div>
      ))}
    </div>
  );
};

export default function Drawer() {
  const auth = useContext(Auth);
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth?.logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
      width={104}
      style={{
        backgroundColor: '#1B093C',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0',
        height: '100vh',
      }}
      >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: 90, height: 64, marginBottom: 48 }} />
          <IconGroup count={3} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconGroup count={3} />
          <Button
            type="default"
            danger
            size="small"
            onClick={handleLogOut}
            style={{
              marginTop: 24,
              fontSize: 10,
              borderColor: 'white',
              color: 'black',
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      </Sider>
    </Layout>
  );
}