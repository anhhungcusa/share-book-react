import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { useRouter } from '../../hooks/useRouter';
import { CookieService } from '../../services/storage';
import { env } from '../../config/globals';
import { FitLoading } from '../common/Loading';

export const RouteWithAuth = ({ redirectPath = '/login', path, children, ...rest }) => {
	const { state: { auth } } = useContext(DataContext);
	const router = useRouter();
	const existedToken = CookieService.getCookie(env.COOKIE_SECRET_KEY);
	if (auth.isLoggedIn) {
		return (
			<Route path={path} {...rest}>
				{children}
			</Route>
		);
	}
	if (existedToken) {
		return (
			<FitLoading height="70vh" fontSize="2rem" color="#3498db" />
		);
	}
	const from = router.pathname;
	return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
};
