import React from 'react';
import { useContext } from 'react';
import { Button, Space, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './Header.css';
import { NavBar } from '../NavBar/NavBar';
import { DataContext } from '../../context/DataProvider';
export const Header = ({title = 'Title'}) => {
	const { state: { auth }, action: { resetAuth, resetMyGiveaways } } = useContext(DataContext);
	const onLogout = () => {
		resetAuth()
		resetMyGiveaways()
	};
	return (
		<header>
			<div className="top-bar d-flex-between">
				<div className="title">{title}</div>
				<span>
					{auth.isLoggedIn ? (
						<Space>
							<span className="user-name">{auth.user && auth.user.username}</span>
                            <Avatar icon={<UserOutlined />} />
							<Button onClick={onLogout}>Logout</Button>
						</Space>
					) : (
						<NavLink activeClassName="link--active" className="ant-btn link form-button" to="/login">
							Login
						</NavLink>
					)}
				</span>
			</div>
			<NavBar />
		</header>
	);
};
