import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { CookieService } from '../services/storage';
import decode from 'jwt-decode'
import { env } from '../config/globals';

export const DataContext = createContext();

const initState = {
	auth: {
		isLoggedIn: false,
		user: null,
		token: null
	},
	publicGiveaways: null,
	myGiveaways: null,
	categories: null,
	loads: {
		auth: false,
		publicGiveaways: false,
		categories: false,
		myGiveaways: false
	},
	initLoads: {
		auth: false,
		publicGiveaways: false,
		categories: false,
		myGiveaways: false
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
		// initStateTest,
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
		CookieService.removeCookie(env.COOKIE_SECRET_KEY)
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
	const setMyGiveaways = (giveaways) => {
		setState(state => {
			return {...state, myGiveaways: giveaways}
		})
	}

	const resetMyGiveaways = () => {
		setState(state => {
			return {...state, myGiveaways: null, initLoads: {...state.initLoads, myGiveaways: false}}
		})
	}

	const addGiveaway = giveaway => {
		giveaway.byUser = state.auth.user
		giveaway.category = state.categories.find(category => category._id === giveaway.category)
		setState(state => {
			const newPublicGiveaways = state.publicGiveaways ? [giveaway, ...state.publicGiveaways] : [giveaway]
			const newMyGiveaways = state.myGiveaways ? [giveaway, ...state.myGiveaways] : [giveaway]
			return {...state, publicGiveaways: newPublicGiveaways, myGiveaways: newMyGiveaways}
		})
	}


	// handle category
	const setCategories = categories => {
		setState(state => {
			return {...state, categories: categories}
		})

	}
 	const addCategory = category => {
		setState(state => {
			const newCategories = state.categories ? [category, ...state.categories] : [category]
			return {...state, categories: newCategories}
		})
	}

	const setLoading = (field, isLoading = false) => {
		setState((state) => {
			const newLoads = { ...state.loads, [field]: isLoading };
			return {...state, loads: newLoads};
		});
	};

	const setInitLoading = (field, isLoading = false) => {
		setState((state) => {
			const newLoads = { ...state.initLoads, [field]: isLoading };
			return {...state, initLoads: newLoads};
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
					setMyGiveaways,
					resetMyGiveaways,
					addGiveaway,
					setCategories,
					addCategory,
					setLoading,
					setInitLoading,
					resetState,
				}
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
