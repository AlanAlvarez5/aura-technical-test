import { useNavigate } from "react-router-dom";
import { Typography, Row, Col } from "antd";


import heroImage from '../assets/hero/hero-image.jpg';
import documentsImage from '../assets/images/documents-image.svg';
import uploadYourDataImage from '../assets/images/upload-your-data-image.svg';
import aiImage from '../assets/images/ai-tool.svg';
import { Menu } from "../components/dashboard/Menu";
import CompanySearcher from "../components/dashboard/CompanySearcher";
import { UploadProjectModal } from "../components/dashboard/UploadProjectModal";
import { useState } from "react";

const { Title, Text } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();
  const [openUploadModel, setOpenUploadModel] = useState(false);

  const menuOptions = [
    {
      label: "Search Data",
      image: documentsImage,
      onClick: () => null,
    },
    {
      label: "Upload your Data",
      image: uploadYourDataImage,
      onClick: () => setOpenUploadModel(true),
    },
    {
      label: "Try our AI Tool",
      image: aiImage,
      onClick: () => navigate("/aura-ai"),
    },
  ]

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <div
        style={{
          height: 390,
          width: '100%',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Title style={{ fontFamily: 'Sansation', color: 'white', paddingTop: 5 }}>
          AURA
        </Title>
        <Title level={4} style={{ fontFamily: 'Sansation', color: 'white' }}>
          Augmented Universal Research Assistant
        </Title>
        <Text
          style={{
            fontFamily: 'Sansation',
            textShadow: '2px 2px 2px black',
            color: 'white',
          }}
        >
          Your in one single intuitive platform along side with your team.
        </Text>

        <Row gutter={32} style={{ marginTop: 32, marginBottom: 32 }}>
        {
          menuOptions.map((option) => (
              <Col key={option.label}>
                <Menu label={option.label} image={option.image} onClick={option.onClick} />
              </Col>
            ))
        }
        </Row>
      </div>

      <div style={{ padding: 24 }}>
         <CompanySearcher />
      </div>

      <UploadProjectModal open={openUploadModel} onCancel={() => setOpenUploadModel(false)} />

    </div>
  );
}