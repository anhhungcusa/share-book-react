import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { CookieService } from '../services/storage';
import { decode } from 'jsonwebtoken';
import { env } from '../config/globals';

export const DataContext = createContext();

const initState = {
	auth: {
		isLoggedIn: false,
		user: null,
		token: null
	},
	publicGiveaways: null,
	categories: null,
	loads: {
		auth: false,
		publicGiveaways: false,
		categories: false
	}
};
export const DataProvider = ({ children }) => {
	const [ state, setState ] = useState(initState);
	useEffect(() => {
		const token = CookieService.getCookie(env.COOKIE_SECRET_KEY);
		if (token) {
			const user = decode(token);
			setAuth(token, user);
		}
	}, []);
	const setAuth = (token, user) => {
		setState((state) => {
			const newAuth = { token, user, isLoggedIn: true };
			state.auth = newAuth;
			return state;
		});
	};
	const resetAuth = () => {
		setState((state) => {
			state.auth = initState.auth;
			return state;
		});
	};

	const setLoading = (field, isLoading = false) => {
		setState((state) => {
			const newLoads = { ...state.loads, [field]: isLoading };
			state.loads = newLoads;
			return state;
		});
	};

	const resetState = () => {
		setState(initState)
	}

	return (
		<DataContext.Provider
			value={{
				state: { ...state },
				action: {
					setAuth,
					resetAuth,
					setLoading,
					resetState
				}
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
