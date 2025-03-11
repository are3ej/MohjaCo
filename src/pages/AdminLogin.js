import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authService } from '../services/auth';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Login attempt started');
      const user = await authService.login(values.email, values.password);
      
      if (user) {
        console.log('User authenticated:', user.email);
        message.success('Login successful!');
        
        // Verify admin status before navigation
        const isAdmin = await authService.checkAdminStatus();
        if (isAdmin) {
          console.log('Admin verified, navigating to equipment page');
          navigate('/admin/equipment', { replace: true });
        } else {
          await authService.logout();
          message.error('Unauthorized access');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card
        title="Admin Login"
        style={{ width: 300 }}
        headStyle={{ textAlign: 'center' }}
      >
        <Form
          name="admin_login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;