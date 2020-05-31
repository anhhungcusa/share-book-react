import React, { useState, useMemo } from "react";
import "./Login.css";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "../../hooks/useRouter";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { AuthService } from "../../services/auth";
export const LoginPage = () => {
  const router = useRouter();
  const {
    action: { setAuth }
  } = useContext(DataContext);
  const [isValidForm, setIsValidForm] = useState(false);
  const onChangeFields = (_, allFields) => {
    const isValid = allFields.every(
      field => field.errors.length === 0 && field.touched === true
    );
    setIsValidForm(isValid);
  };

  const [loading, setLoading] = useState(false);
  const initialValues = useMemo(() => {
    const { username = "", password = "" } = router.state || {};
    if (username) setIsValidForm(true);
    return { username, password };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = ({ username, password }) => {
    setLoading(true);
    AuthService.login(username, password)
      .then(({ token, user }) => {
        const { from = "/" } = router.state || {};
        setAuth(user, token);
        message.success("login successful");
        router.replace(from);
      })
      .catch(error => {
        setLoading(false);
        message.error(error.message);
      });
  };

  return (
    <div className="login-page d-flex-center flex-column">
      <div className="card">
        <h2 className="title">Login</h2>
        <div className="login-form">
          <Form
            initialValues={initialValues}
            onFieldsChange={onChangeFields}
            scrollToFirstError
            name="login"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'username is required'}]}
              hasFeedback
            >
              <Input className="form-input" placeholder="username" />
            </Form.Item>
            <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'password is required' }]}>
              <Input.Password className="form-input" placeholder="password" />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={!isValidForm}
                htmlType="submit"
                loading={loading}
                className="form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="card">
        <span className="addition">
          Don't have an account? <Link to="/register">Register now!</Link>
        </span>
      </div>
    </div>
  );
};
