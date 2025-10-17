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
  Tabs
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  LogoutOutlined,
  DollarOutlined,
  UndoOutlined
} from '@ant-design/icons';
import { firebaseService } from '../../services/firebaseService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { Tag } from 'antd';

const { Option } = Select;

const AdminEquipmentManager = () => {
  const [equipment, setEquipment] = useState([]);
  const [soldEquipment, setSoldEquipment] = useState([]);
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
    fetchSoldEquipment();
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

  const fetchSoldEquipment = async () => {
    try {
      const data = await firebaseService.getSoldEquipment();
      setSoldEquipment(data);
    } catch (error) {
      message.error('Error fetching sold equipment');
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

      // Check for supported media formats
      const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi', '.webm', '.mkv'];
      const hasValidFormats = imageUrls.every(url => {
        const lowerUrl = url.toLowerCase();
        return supportedFormats.some(format => lowerUrl.includes(format));
      });

      if (!hasValidFormats) {
        throw new Error('Please use supported media formats: JPG, PNG, GIF, MP4, MOV, AVI, WEBM');
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
        soldPrice: values.soldPrice || null, // Allow null if no price entered
        soldNotes: values.soldNotes || '', // Default to empty string if no notes
      };
  
      // Mark equipment as sold
      await firebaseService.markEquipmentAsSold(selectedEquipment.id, soldData);
  
      message.success('Equipment marked as sold successfully');
      setSoldModalVisible(false);
      soldForm.resetFields();
      fetchEquipment();  // Refresh equipment list
      fetchSoldEquipment(); // Refresh sold equipment list
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error marking equipment as sold');
    }
  };

  const handleReturnSold = async (soldEquipmentId) => {
    try {
      await firebaseService.returnSoldEquipment(soldEquipmentId);
      message.success('Equipment returned to available successfully');
      fetchEquipment(); // Refresh equipment list
      fetchSoldEquipment(); // Refresh sold equipment list
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error returning equipment');
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
      title: 'Media',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <Space>
          {images?.slice(0, 3).map((url, index) => {
            const isVideo = url.toLowerCase().match(/\.(mp4|mov|avi|webm|mkv)$/);
            return isVideo ? (
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <video 
                  src={url}
                  style={{ 
                    width: 50, 
                    height: 50, 
                    objectFit: 'cover', 
                    marginRight: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0'
                  }}
                  muted
                  loop
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video thumbnail error for URL:', url, e);
                    e.target.style.display = 'none';
                    // Show a placeholder for broken videos
                    const placeholder = document.createElement('div');
                    placeholder.style.cssText = `
                      width: 50px; 
                      height: 50px; 
                      background: #ff6b6b; 
                      color: white; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-size: 10px; 
                      margin-right: 8px; 
                      border-radius: 4px;
                    `;
                    placeholder.textContent = 'VIDEO';
                    e.target.parentNode.appendChild(placeholder);
                  }}
                  onLoadStart={() => console.log('Admin video loading:', url)}
                  onCanPlay={() => console.log('Admin video can play:', url)}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    pointerEvents: 'none'
                  }}
                >
                  ▶
                </div>
              </div>
            ) : (
              <img 
                key={index}
                src={url}
                alt={`equipment-${index}`}
                style={{ width: 50, height: 50, objectFit: 'cover', marginRight: '8px' }}
              />
            );
          })}
          {images.length > 3 && <span>+{images.length - 3} more</span>}
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

  const soldColumns = [
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
      title: 'Media',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <Space>
          {images?.slice(0, 3).map((url, index) => {
            const isVideo = url.toLowerCase().match(/\.(mp4|mov|avi|webm|mkv)$/);
            return isVideo ? (
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <video 
                  src={url}
                  style={{ 
                    width: 50, 
                    height: 50, 
                    objectFit: 'cover', 
                    marginRight: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0'
                  }}
                  muted
                  loop
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video thumbnail error for URL:', url, e);
                    e.target.style.display = 'none';
                    // Show a placeholder for broken videos
                    const placeholder = document.createElement('div');
                    placeholder.style.cssText = `
                      width: 50px; 
                      height: 50px; 
                      background: #ff6b6b; 
                      color: white; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-size: 10px; 
                      margin-right: 8px; 
                      border-radius: 4px;
                    `;
                    placeholder.textContent = 'VIDEO';
                    e.target.parentNode.appendChild(placeholder);
                  }}
                  onLoadStart={() => console.log('Admin video loading:', url)}
                  onCanPlay={() => console.log('Admin video can play:', url)}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    pointerEvents: 'none'
                  }}
                >
                  ▶
                </div>
              </div>
            ) : (
              <img 
                key={index}
                src={url}
                alt={`equipment-${index}`}
                style={{ width: 50, height: 50, objectFit: 'cover', marginRight: '8px' }}
              />
            );
          })}
          {images.length > 3 && <span>+{images.length - 3} more</span>}
        </Space>
      )
    },
    {
      title: 'Sold Date',
      dataIndex: 'soldAt',
      key: 'soldAt',
      render: (soldAt) => soldAt ? new Date(soldAt).toLocaleDateString() : 'N/A'
    },
    {
      title: 'Sold Price',
      dataIndex: 'soldPrice',
      key: 'soldPrice',
      render: (price) => price ? `$${price}` : 'N/A'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<UndoOutlined />}
            onClick={() => handleReturnSold(record.id)}
          >
            Return to Available
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
            style={{ marginBottom: '16px', padding: '10px 20px' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1890ff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            Add New Equipment
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginLeft: '8px', padding: '10px 20px' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff4d4f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            Logout
          </Button>
        </Space>
      }
      style={{ margin: '20px', borderRadius: '8px' }}
    >
      <Tabs defaultActiveKey="available" items={[
        {
          key: 'available',
          label: 'Available Equipment',
          children: (
            <Table
              columns={columns}
              dataSource={equipment}
              rowKey="id"
              loading={loading}
            />
          )
        },
        {
          key: 'sold',
          label: 'Sold Equipment',
          children: (
            <Table
              columns={soldColumns}
              dataSource={soldEquipment}
              rowKey="id"
              loading={loading}
            />
          )
        }
      ]} />

      <Modal
        title={editingEquipment ? 'Edit Equipment Details' : 'Add New Equipment'}
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
            label={<span style={{ color: 'black', fontWeight: 'bold' }}>Equipment Name</span>}
            rules={[{ required: true, message: 'Please enter equipment name!' }]}
            style={{ backgroundColor: 'white', marginBottom: '16px', padding: '10px' }}
          >
            <Input placeholder="Enter equipment name" style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span style={{ color: 'black', fontWeight: 'bold' }}>Description</span>}
            style={{ backgroundColor: 'white', padding: '10px' }}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span style={{ color: 'black', fontWeight: 'bold' }}>Category</span>}
            rules={[{ required: true, message: 'Please select a category!' }]}
            style={{ backgroundColor: 'white', marginBottom: '16px', padding: '10px' }}
          >
            <Select style={{ borderRadius: '4px' }}>
              <Option value="Dozer">Dozer</Option>
              <Option value="Wheel loader">Wheel loader</Option>
              <Option value="Grader">Grader</Option>
              <Option value="Excavator">Excavator</Option>
              <Option value="Compactor">Compactor</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="imageUrls"
            label={<span style={{ color: 'black', fontWeight: 'bold' }}>Media URLs (comma-separated)</span>}
            rules={[{ required: true, message: 'Please enter media URLs!' }]}
            help="Enter Cloudinary links for images and videos separated by commas. Supported formats: JPG, PNG, GIF, MP4, MOV, AVI"
            style={{ backgroundColor: 'white', marginBottom: '16px', padding: '10px' }}
          >
            <Input.TextArea 
              placeholder="https://res.cloudinary.com/example1.jpg, https://res.cloudinary.com/example2.mp4, https://res.cloudinary.com/example3.png"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item
            style={{ backgroundColor: 'white', padding: '10px' }}
          >
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
        centered
      >
        <Form
          form={soldForm}
          layout="vertical"
          onFinish={handleSoldSubmit}
        >

          <Form.Item
            name="soldNotes"
            label={<span style={{ color: 'black', fontWeight: 'bold' }}>Sale Notes (Optional)</span>}
            style={{ backgroundColor: 'white', padding: '10px' }}
          >
            <Input.TextArea placeholder="Add any notes about the sale (optional)" />
          </Form.Item>

          <Form.Item
            style={{ backgroundColor: 'white', padding: '10px' }}
          >
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