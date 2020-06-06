import React, { useState } from 'react'
import './RegisterWinnerInfo.css'
import { Form, Input, Button, message } from 'antd'
import { useRouter } from '../../hooks/useRouter'
import { GiveawayService } from '../../services/giveaway'
export const RegisterWinnerInfoPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isValidForm, setIsValidForm] = useState(false);
    const onChangeFields = (_, allFields) => {
        const isValid = allFields.every(
            field => field.errors.length === 0 && field.touched === true
        );
        setIsValidForm(isValid);
    };

    const onSubmit = (values) => {
        const { email, fullname, address, phone } = values
        const { giveawayId } = router.query
        if (!giveawayId) return message.error('invalid page')
        setLoading(true)
        GiveawayService.updateWinnerInfo({ email, fullname, address, phone }, giveawayId)
            .then(_ => {
                message.success('register successful')
            }).catch(err => {
                message.error(err.message)
            })
            .finally(_ => setLoading(false))
    }


    return (
        <div className='register-winner-info-page'>
            <h1>Register information receiver for giveaway</h1>
            <div className="register-info-form container">
                <Form
                    onFieldsChange={onChangeFields}
                    onFinish={onSubmit}
                >
                    <Form.Item

                        name='email'
                        rules={[
                            { type: 'email', message: 'invalid email' },
                            { required: true, message: 'email is required' }
                        ]}
                    >
                        <Input placeholder='email' />
                    </Form.Item>
                    <Form.Item

                        name='fullname'
                        rules={[
                            { required: true, message: 'name is required' }
                        ]}
                    >
                        <Input placeholder='name' />
                    </Form.Item>
                    <Form.Item

                        name='address'
                        rules={[
                            { required: true, message: 'address is required' }
                        ]}
                    >
                        <Input placeholder='address' />
                    </Form.Item>
                    <Form.Item

                        name='phone'
                        rules={[
                            { required: true, message: 'phone is required' }
                        ]}
                    >
                        <Input placeholder='phone' />
                    </Form.Item>
                    <Form.Item>
                        <div className='w-100 d-flex-center'>
                            <Button disabled={!isValidForm} loading={loading} htmlType='submit'>Submit</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            
        </div>
    )
}