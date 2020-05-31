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
const initStateTest = {
	auth: {
		isLoggedIn: true,
		user: {
			createdAt: "2020-05-30T17:16:56.504Z",
			email: "test@gmail.com",
			updatedAt: "2020-05-30T17:16:56.504Z",
			username: "test",
			__v: 0,
			_id: "5ed29508150d2b5ed4350b28"
		},
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQyOTUwODE1MGQyYjVlZDQzNTBiMjgiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1OTA5MDM1MjYsImV4cCI6MTU5MTUwODMyNn0.XTr-JTuhgq3ge_vpqRxOCnQLWdF16YrVrl5PyBv8o2s'
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
	const [ state, setState ] = useState(
		// initStateTest
		initState
	);
	useEffect(() => {
		const token = CookieService.getCookie(env.COOKIE_SECRET_KEY);
		if (token) {
			const user = decode(token);
			setAuth(token, user);
		}
	}, []);

	// handle auth
	const setAuth = (token, user) => {
		setState((state) => {
			const newAuth = { token, user, isLoggedIn: true };
			return { ...state, auth: newAuth };
		});
	};
	const resetAuth = () => {
		setState((state) => {
			return { ...state, auth: initState.auth };
		});
	};
	// handle public giveaways
	const setPublicGiveaways = (giveaways) => {
		setState(state => {
			return {...state, publicGiveaways: giveaways}
		})
	}
	 

	const setLoading = (field, isLoading = false) => {
		setState((state) => {
			const newLoads = { ...state.loads, [field]: isLoading };
			return {...state, loads: newLoads};
		});
	};

	const resetState = () => {
		setState(initState);
	};

	return (
		<DataContext.Provider
			value={{
				state: { ...state },
				action: {
					setAuth,
					resetAuth,
					setPublicGiveaways,
					setLoading,
					resetState,

				}
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
