import React from 'react'
import './GiveawayCard.css'
import moment from 'moment'
import {UserOutlined} from '@ant-design/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import { Card, Avatar, Space } from 'antd'

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
            <Card.Meta avatar={ <Avatar  size='default' icon={<UserOutlined />} />} 
            title={byUser.username} description={description && description.slice(0, 50) + description.length > 50 ? '...' : ''} />
            <Space className="giveaway-info" size={2} direction='vertical'  >
                {  numParticipants&& <span>number of participants: {numParticipants} </span>}
                {  result && <span>lucky number: {result.winningNumbers} </span>}
                <span>start at {moment(begin).format('DD/MM/YYYY ss:mm:HH')}</span>
                { end && <span>end at{moment(begin).format('DD/MM/YYYY ss:mm:HH')}</span>}

            </Space>
        </Card>
    )
}