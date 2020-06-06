import React, { useEffect, useState } from 'react'
import './GiveawayDetail.css'
import { Modal, Space, Tag, Row, Col, Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { RegistrationList } from '../../RegistrationList/RegistrationList'
import { GiveawayRegistrationService } from '../../../services/giveaway-registration'
import { GiveawayService } from '../../../services/giveaway'
export const GiveawayDetailModal = ({
    visible, close,
    giveaway
}) => {
    const {_id, title, gift, description, byUser, begin, end, numParticipants, result} = giveaway
    const [registrations, setRegistrations] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(visible) {
            document.body.style.overflowY = 'hidden'
            // fetch registrations
            setLoading(true)
            GiveawayService.fetchRegistrationsOfGiveaway(_id)
            .then(registrations => {
                setRegistrations(registrations)
            }).catch(err => {
                message.error(err.message)
            }).finally(_ => setLoading(false))
        } else {
            document.body.style.overflowY = 'auto'
        }
    }, [visible, _id])
    const addNewRegistration = (luckyNumber, email) => {
        let registrationLength =  registrations ? registrations.length : 0
        if(registrationLength >= numParticipants) {
            message.info('The maximum number of registration')
            return Promise.resolve(false)
        }
        return GiveawayRegistrationService
            .registerGiveaway(email, luckyNumber, _id)
            .then(registration => {
                let newRegistrations =  registrations ? registrations.slice() : []
                newRegistrations.push(registration)
                setRegistrations(newRegistrations)
                return true
            }).catch(err => {
                message.error(err.message)
                return false
            })
    }


    return (
        <Modal
            className="giveaway-detail"
            title={(
                <Space>
                    {title}
                    {result && (
                        <>
                            <Tag color="#f50" >this giveaway has ended at ${moment(end).format('DD/MM/YYYY ss:mm:HH')} </Tag>
                            <Tag color="#87d068" >lucky number: {result.winningNumbers} </Tag>
                        </>
                    )}
                </Space>
            )}
            visible={visible}
            onCancel={close}
            footer={null}
            width='90%'
        >
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Space direction="vertical" style={{width: '100%'}}>
                        <div className='giveaway-gift d-flex-center'>
                            <img alt="gift" src={gift.image} />
                        </div>
                        <div className="giveaway-owner">
                            <Space>
                                <Avatar  size='default' icon={<UserOutlined />} />
                                <span className="giveaway-owner__name"> {byUser.username} </span>
                            </Space>
                        </div>
                        <div className="giveaway-description">
                            {description}
                        </div>
                        <Space>
                            <Tag color="#108ee9" >number of participants: {numParticipants} </Tag>
                            <Tag color="#108ee9">start at {moment(begin).format('DD/MM/YYYY ss:mm:HH')}</Tag>
                        </Space>
                        <ul className='rules'>
                            <li>
                                <b>how to join giveaway: </b> 
                                <ul>
                                    <li>comment 1 lucky number from 1 to {numParticipants} so that you can win</li>
                                    <li>give us your email so that we can contact you when you win</li>
                                </ul>
                            </li>
                        </ul>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <div className="registration-list">
                        <RegistrationList 
                            numParticipants={numParticipants}
                            registrations={registrations}
                            addNewRegistration={addNewRegistration}
                            loading={loading} />
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}