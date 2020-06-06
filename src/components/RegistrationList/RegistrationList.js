import React, { useState } from 'react'
import './RegistrationList.css'
import { Space, List, Form, Input, Button, Avatar, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {convertDateToTimeFromNow} from '../../utils'
export const RegistrationList = ({
    registrations, addNewRegistration,
    loading, numParticipants
}) => {
    const [submitLoading, setSubmitLoading] = useState(false)
    const [isValidForm, setIsValidForm] = useState(false);
    const onChangeFields = (_, allFields) => {
        const isValid = allFields.every(
            field => field.errors.length === 0 && field.touched === true
        );
        setIsValidForm(isValid);
    };
    const onSubmit = (values) => {
        setSubmitLoading(true)
        const { luckyNumber, email } = values
        addNewRegistration(luckyNumber, email).then(_ => {
            setSubmitLoading(false)
        })
    }
    return (
        <Space direction="vertical">
            <List
                header={<b>
                    participants : {registrations ? registrations.length : 0} {' '}
                    {registrations && registrations.length === numParticipants && <Tag color='#f50'>max!</Tag>}
                </b>}
                bordered={false}
                size='small'
                className="registrations"
                loading={loading}
                dataSource={registrations ? registrations : undefined}
                renderItem={registration => (
                    <List.Item>
                        <div className="d-flex-between w-100">
                            <Space size="middle" className="registration" >
                                <Space size='small' className="registration__owner">
                                    <Avatar size='small' icon={<UserOutlined />} />
                                    <i>
                                        {registration.email}:
                                    </i>
                                </Space>
                                <span className="registration__lucky-num">{registration.luckyNumber}</span>
                            </Space>
                            <i className="time">{convertDateToTimeFromNow(registration.createdAt)}  </i>
                        </div>
                    </List.Item>
                )}
            />
            <div className='d-flex-center' >
                <Form
                    name="register-giveaway"
                    onFieldsChange={onChangeFields}
                    onFinish={onSubmit} layout='inline'>
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'invalid email' },
                            { required: true, message: 'email is required' }
                        ]}
                    >
                        <Input placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        name='luckyNumber'
                        rules={[
                            {
                                required: true,
                                message: 'lucky number  is required'
                            },
                            {
                                type: 'number',
                                transform: (value) => {
                                    return Number(value) ? Math.round(Number(value)) : value;
                                },
                                message: 'lucky number  must be number'
                            }
                        ]}
                    >
                        <Input placeholder="lucky number" />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={!isValidForm} loading={submitLoading} htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </Space>
    )
}