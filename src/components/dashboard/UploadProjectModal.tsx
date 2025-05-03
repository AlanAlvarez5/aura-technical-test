import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Input,
  Select,
  Checkbox,
  Form,
  Row,
  Col,
  Button,
} from 'antd';

interface UploadDataFormProps {
  open: boolean;
  onCancel: () => void;
}

const { Option } = Select;

const expertValues = [
  'Competitor',
  'Customer',
  'Industry Consultant',
  'Former Executive',
  'Partner'
];

export const UploadProjectModal: React.FC<UploadDataFormProps> = ({ open, onCancel }) => {
  const [type, setType] = useState<number>(0);
  const [expert, setExpert] = useState<string[]>([]);

  const handleCheckChanges = (checked: string[]) => {
    if (checked.includes('all')) {
      if (expert.length === expertValues.length) {
        setExpert([]);
      } else {
        setExpert(expertValues);
      }
    } else {
      setExpert(checked);
    }
  };

  const onFinish = () => {
    alert('Data Saved');
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1020}
      height={818}
      title={<Typography.Title level={3}>New Data</Typography.Title>}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Project name"
          name="name"
          rules={[{ required: true, message: 'Project name requiered' }]}
        >
          <Input placeholder="E.g. Microsoft Research" />
        </Form.Item>

        <Form.Item
          label="Project type"
          name="type"
          rules={[{ required: true, message: 'Project type is requiered' }]}
        >
          <Select value={type} onChange={(v) => setType(v)}>
            <Option value={0}>Company Research</Option>
            <Option value={1}>Company Research 2</Option>
            <Option value={2}>Industry Research 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Companies"
          name="companies"
          rules={[{ required: true, message: 'Company Names is requiered' }]}
        >
          <Input placeholder="E.g. Microsoft" />
        </Form.Item>

        <Form.Item label="Project Description">
          <Input.TextArea
            placeholder="Please define the purpose for this project."
            rows={2}
          />
        </Form.Item>

        <Form.Item label="Project Scope">
          <Input.TextArea
            placeholder="Tell us the range for the numbers of experts you want us to include for this research and the type of experts in order for us to start expert
screening stage."
            rows={2}
          />
        </Form.Item>


        <Form.Item
          label="Expert"
          name="companies"
          rules={[{ required: true, message: 'Company Names is requiered' }]}
        >
          <Checkbox.Group
            value={expert}
            onChange={handleCheckChanges}
            style={{ width: '100%' }}
            >
            <Row gutter={16}>
              <Col span={12}>
                <Checkbox
                  value="all"
                  indeterminate={expert.length > 0 && expert.length < expertValues.length}
                  checked={expert.length === expertValues.length}
                  >
                  All
                </Checkbox>
              </Col>
              {expertValues.map((label) => (
                <Col span={12} key={label}>
                  <Checkbox value={label}>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <div style={{ marginTop: 48, display: 'flex', gap: 12 }}>
          <Button onClick={onCancel} style={{ width: 160 }}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 160, backgroundColor: '#E8E5F9', borderColor: '#E8E5F9', color: '#000' } }>
            Upload
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
