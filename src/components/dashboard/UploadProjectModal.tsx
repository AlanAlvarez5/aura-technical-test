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

const companyTypes = [
  {
    id: 1,
    name: 'Company Research',
  },
  {
    id: 2,
    name: 'Management Research',
  },
  {
    id: 3,
    name: 'Industry Research',
  },
]

enum ProjectTypeEnum {
  COMPANY_RESEARCH = 1,
}

export const UploadProjectModal: React.FC<UploadDataFormProps> = ({ open, onCancel }) => {
  const [projectType, setProjectType] = useState<number>(0);
  const [expert, setExpert] = useState<string[]>([]);

  const handleCheckChanges = (checkedValues: string[]) => {
    if (checkedValues.includes('all')) {
      if (!expert.includes('all')) {
        setExpert([...expertValues]);
      } else {
        setExpert([]);
      }
    } else {
      setExpert(checkedValues);
    }
  };


  const isAllSelected = expertValues.every(value => expert.includes(value));
  const isIndeterminate = expert.length > 0 && !isAllSelected;

  const showCompanyField = (projectType: number ): boolean => {
    return projectType === ProjectTypeEnum.COMPANY_RESEARCH;
  }

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
          <Select value={projectType} onChange={(v) => setProjectType(v)}>

            {
              companyTypes.map((item) =>
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            }
          </Select>
        </Form.Item>


        {
            showCompanyField(projectType) && (
            <Form.Item
              label="Companies"
              name="companies"
              rules={[{ required: true, message: 'Company Names is requiered' }]}
            >
              <Input placeholder="E.g. Microsoft" />
            </Form.Item>
          )
        }

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
          name="expert"
          rules={[
            { required: true, message: 'A Company Expert is required' },

          ]}
        >
          <div>
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => {
                if (e.target.checked) {
                  setExpert([...expertValues]);
                } else {
                  setExpert([]);
                }
              }}
            >
              All
            </Checkbox>

            <Checkbox.Group
              value={expert}
              onChange={handleCheckChanges}
              style={{ width: '100%', marginTop: '8px' }}
            >
              <Row gutter={16}>
                {expertValues.map((label) => (
                  <Col span={12} key={label}>
                    <Checkbox value={label}>
                      {label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
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
