import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./Register.css";
import { useRouter } from "../../hooks/useRouter";
import { UserService } from "../../services/user";
export const RegisterPage = () => {
  const router = useRouter();
  const [isValidForm, setIsValidForm] = useState(false);
  const onChangeFields = (_, allFields) => {
    const isValid = allFields.every(
      field => field.errors.length === 0 && field.touched === true
    );
    setIsValidForm(isValid);
  };
  const [loading, setLoading] = useState(false);
  const onFinish = values => {
    const { email, password, username } = values;
    setLoading(true);
    UserService.registerUser(email, password, username)
      .then(_ => {
        message.success("Register successful");
        router.push("/login", { username, password });
      })
      .catch(error => {
        setLoading(false);
        message.error(error.message);
      });
  };
  return (
    <div className="register-page d-flex-center flex-column">
      <div className="card">
        <h2 className="title">Register</h2>
        <div className="register-form">
          <Form
            onFieldsChange={onChangeFields}
            scrollToFirstError
            name="register"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true }, { type: "email" }]}
              hasFeedback
            >
              <Input className="form-input" placeholder="Email" />
            </Form.Item>
            <Form.Item name="username" rules={[{ required: true }]} hasFeedback>
              <Input className="form-input" placeholder="username" />
            </Form.Item>
            <Form.Item name="password" hasFeedback rules={[{ required: true }]}>
              <Input.Password className="form-input" placeholder="password" />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={!isValidForm}
                type="primary"
                htmlType="submit"
                loading={loading}
                className="form-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="card d-flex-center">
        <span>
          You have an account? <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
};
