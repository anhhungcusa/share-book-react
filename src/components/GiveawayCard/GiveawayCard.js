import React from 'react'
import './GiveawayCard.css'
import moment from 'moment'
import {UserOutlined} from '@ant-design/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import { Card, Avatar, Space, Alert, Tag } from 'antd'

export const GiveawayCard = ({giveaway}) => {
    const {title, gift, description, byUser, begin, end, numParticipants, result} = giveaway
    return (
        <Card
            className="giveaway-card"
            title={title}
            actions={[
                <FontAwesomeIcon icon={faExpandArrowsAlt} />
            ]}
            cover={<img alt="gift-img" src={gift.image} />}
        >   
        <div>
            <Card.Meta avatar={ <Avatar  size='default' icon={<UserOutlined />} />} 
            title={byUser.username} description={<span className="giveaway-description">{description}</span>} />
        </div>
            <Space className="giveaway-info" size={2} direction='vertical'  >
                {  result && <Tag color="#87d068" >lucky number: {result.winningNumbers} </Tag>}
                {  numParticipants&& <Tag color="#108ee9" >number of participants: {numParticipants} </Tag>}
                <Tag color="#108ee9">start at {moment(begin).format('DD/MM/YYYY ss:mm:HH')}</Tag>
                { end && <Tag color="#f50">end at {moment(begin).format('DD/MM/YYYY ss:mm:HH')}</Tag>}
            </Space>
        </Card>
    )
}