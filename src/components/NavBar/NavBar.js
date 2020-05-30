import React, { useEffect, useState, useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts, faCogs } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { useRouter } from '../../hooks/useRouter';
import { DataContext } from '../../context/DataProvider';

export const NavBar = () => {
	const [ currentItem, setCurrentItem ] = useState('/');
	const { state: { auth } } = useContext(DataContext);
	const router = useRouter();
	useEffect(
		() => {
			const pathname = router.pathname;
			setCurrentItem(pathname);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ router.pathname ]
	);
	return (
		<div className="top-nav">
			<Menu selectedKeys={[ currentItem ]} mode="horizontal" theme="dark">
				<Menu.Item
					key="/"
					className="top-nav__item"
					icon={<FontAwesomeIcon style={{ marginRight: '5px' }} icon={faGifts} />}
				>
					<Link className="nav-link" to="/" />
					Giveaway
				</Menu.Item>
                {
                    auth.isLoggedIn && (
                        <Menu.Item
                            key="/manage-giveaways"
                            className="top-nav__item"
                            icon={<FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCogs} />}
                        >
                            <Link className="nav-link" to="/manage-giveaways" />
                            Manage giveaways
                        </Menu.Item> 
                    )
                }
			</Menu>
		</div>
	);
};
