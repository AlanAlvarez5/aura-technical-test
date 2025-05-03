import { Card, Typography } from "antd";

const { Text } = Typography;

interface MenuProps {
  image: string;
  label: string;
  onClick: () => void;
}

export const Menu = ({ label, image, onClick }: MenuProps) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        width: 180,
        height: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 4,
        cursor: "pointer",
        textAlign: "center",
        border: "0"
      }}
    >
      <img
        src={image}
        alt={`${label}`}
        style={{ height: 120, width: 120, objectFit: "contain", marginBottom: 8 }}
      />
      <Text style={{ fontFamily: "Sansation", color: "#3E4551" }}>
        {label}
      </Text>
    </Card>
  );
};