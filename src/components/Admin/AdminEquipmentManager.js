import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  message, 
  Space, 
  Select,
  DatePicker
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  LogoutOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { firebaseService } from '../../services/firebaseService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { Tag } from 'antd';

const { Option } = Select;

const AdminEquipmentManager = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [soldModalVisible, setSoldModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [form] = Form.useForm();
  const [soldForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const data = await firebaseService.getAllEquipment();
      setEquipment(data);
    } catch (error) {
      message.error('Error fetching equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      message.error('Error logging out');
    }
  };

  const handleAddEdit = async (values) => {
    setLoading(true);
    try {
      const imageUrls = values.imageUrls
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const validUrls = imageUrls.every(url => {
        try {
          new URL(url);
          return url.includes('cloudinary.com');
        } catch {
          return false;
        }
      });

      if (!validUrls) {
        throw new Error('Please enter valid Cloudinary links only');
      }

      const equipmentData = {
        name: values.name.trim(),
        description: values.description?.trim() || '',
        category: values.category.trim(),
        images: imageUrls,
        status: 'available'
      };

      if (!equipmentData.name) {
        throw new Error('Equipment name is required');
      }
      
      if (!equipmentData.category) {
        throw new Error('Category is required');
      }

      if (imageUrls.length === 0) {
        throw new Error('At least one image URL is required');
      }

      if (editingEquipment) {
        await firebaseService.updateEquipment(editingEquipment.id, equipmentData);
        message.success('Equipment updated successfully');
      } else {
        await firebaseService.createEquipment(equipmentData);
        message.success('Equipment added successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      fetchEquipment();
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error saving equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await firebaseService.deleteEquipment(id);
      message.success('Equipment deleted successfully');
      fetchEquipment();
    } catch (error) {
      message.error('Error deleting equipment');
    }
  };

  const handleMarkAsSold = async (equipment) => {
    setSelectedEquipment(equipment);
    setSoldModalVisible(true);
  };

  const handleSoldSubmit = async (values) => {
    try {
      const soldData = {
        soldAt: values.soldDate.toISOString(),
        soldPrice: values.soldPrice,
        soldNotes: values.soldNotes,
      };
  
      // Mark equipment as sold
      await firebaseService.markEquipmentAsSold(selectedEquipment.id, soldData);
  
      message.success('Equipment marked as sold successfully');
      setSoldModalVisible(false);
      soldForm.resetFields();
      fetchEquipment();  // Refresh equipment list
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error marking equipment as sold');
    }
  };
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <Space>
          {images?.map((url, index) => (
            <img 
              key={index}
              src={url}
              alt={`equipment-${index}`}
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          ))}
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'sold' ? 'red' : 'green'}>
          {status?.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              const formData = {
                ...record,
                imageUrls: record.images?.join(', ')
              };
              setEditingEquipment(record);
              form.setFieldsValue(formData);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Button
            type="dashed"
            icon={<DollarOutlined />}
            onClick={() => handleMarkAsSold(record)}
            disabled={record.status === 'sold'}
          >
            Mark as Sold
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Equipment Management"
      extra={
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingEquipment(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add New Equipment
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={equipment}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
        >
          <Form.Item
            name="name"
            label="Equipment Name"
            rules={[{ required: true, message: 'Please enter equipment name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              <Option value="Dozer">Dozer</Option>
              <Option value="Wheel loader">Wheel loader</Option>
              <Option value="Grader">Grader</Option>
              <Option value="Excavator">Excavator</Option>
              <Option value="Compactor">Compactor</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="imageUrls"
            label="Image URLs (comma-separated)"
            rules={[{ required: true, message: 'Please enter image URLs!' }]}
            help="Enter Cloudinary links separated by commas"
          >
            <Input.TextArea 
              placeholder="https://res.cloudinary.com/example1.jpg, https://res.cloudinary.com/example2.jpg"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {editingEquipment ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Mark Equipment as Sold"
        visible={soldModalVisible}
        onCancel={() => {
          setSoldModalVisible(false);
          soldForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={soldForm}
          layout="vertical"
          onFinish={handleSoldSubmit}
        >
          <Form.Item
            name="soldDate"
            label="Sale Date"
            rules={[{ required: true, message: 'Please select the sale date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="soldPrice"
            label="Sale Price"
            rules={[{ required: true, message: 'Please enter the sale price!' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item
            name="soldNotes"
            label="Sale Notes"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Confirm Sale
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AdminEquipmentManager;