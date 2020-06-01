import React, { useState, useEffect } from 'react';
import { Form,Modal, Select, Divider, Input, Button, Upload, message, DatePicker } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment'
import './CreateGiveawayModal.css';
import { FitLoading } from '../../common/Loading';
import { beforeUpload, getBase64 } from '../../../utils';
import { env } from '../../../config/globals';
export const CreateGiveawayModal = ({
    visible,
    close,
    addNewGiveaway,
    loadingGiveaway,
    categories,
    loadingCategory,
    addNewCategory
}) => {
    const [categoryName, setCategoryName] = useState('');
    const [loadingImg, setLoadingImg] = useState(false)
    const [giftImg, setGiltImg] = useState(null)
    const onChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    };

    const [isValidForm, setIsValidForm] = useState(false);
    const onChangeFields = (_, allFields) => {
        console.log(allFields)
        const isValid = allFields.every((field) => field.errors.length === 0 && field.touched === true);
        setIsValidForm(isValid);
    };

    const onFinish = (values) => {
        const {
            categoryId, title,
            description, giftTitle,
            numParticipants
        } = values
        const begin = values.begin && values.begin.toDate()
        const giveaway = {
            categoryId, title,
            description, giftTitle, giftImg,
            begin, numParticipants
        };
        addNewGiveaway(giveaway).then(isSuccess => {
            if(!isSuccess) return
            close();
        })
    };

    // handle upload img
    const handleChangeImageUrl = (info) => {
        if (info.file.status === 'uploading') {
            setLoadingImg(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoadingImg(false);
                setGiltImg(imageUrl)
            });
        }
    };
    const uploadButton = (
        <div className="upload-button">
            {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    // handle datepicker
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      }

    return (
        <Modal title="Create new a Giveaway" onCancel={close} visible={visible} footer={null}>
            <Form
                {...layout}
                onFieldsChange={onChangeFields}
                scrollToFirstError
                name="create-giveaway"
                onFinish={onFinish}
            >
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'category is required' }]}
                >
                    <Select
                        loading={loadingCategory}
                        style={{ width: 240 }}
                        placeholder="choose category"
                        dropdownRender={(menu) => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    <Input
                                        style={{ flex: 'auto' }}
                                        value={categoryName}
                                        onChange={onChangeCategoryName}
                                    />
                                    <span style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}>
                                        {loadingCategory ? (
                                            <FitLoading />
                                        ) : (
                                                <span onClick={() => addNewCategory(categoryName)}>
                                                    <PlusOutlined /> Add item
                                                </span>
                                            )}
                                    </span>
                                </div>
                            </div>
                        )}
                    >
                        {categories ? (
                            categories.map((category) => (
                                <Select.Option key={category._id} value={categories._id}>
                                    {category.name}
                                </Select.Option>
                            ))
                        ) : null}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="begin"
                    label="Start at"
                    rules={[{ required: true, message: 'start at is required'}]}
                >
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'title is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'description is required' }]}
                >
                    <Input.TextArea allowClear rows={2} />
                </Form.Item>
                <Form.Item
                    name="giftTitle"
                    label="Gift title"
                    rules={[{ required: true, message: 'gift image is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="giftImg"
                    label="Gift image"
                    rules={[{ required: true, message: 'gift image is required' }]}
                >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        action={`${env.SERVER_URL}/users/mock-upload`}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={(file) => beforeUpload(file, message)}
                        onChange={handleChangeImageUrl}
                    >
                        {giftImg ? (
                            <img src={giftImg} alt="giftImg" style={{ width: '100%' }} />
                        ) : (
                                uploadButton
                            )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name='numParticipants'
                    label="Number of participants:"
                    
                    rules={[
                        {
                            required: true,
                            message: 'number of participants  is required'
                        },
                        {
                            type: 'number',
                            transform: (value) => {
                                return Number(value) ? Math.round(Number(value)) : value;
                            },
                            message: 'number of participants  must be number'
                        }
                    ]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item>
                    <div className="d-flex-center w-100 d-flex-center">
                        <Button
                            disabled={!isValidForm}
                            htmlType="submit"
                            loading={loadingGiveaway}
                            className="form-button"
                        >Submit</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};
