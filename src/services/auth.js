import { axios } from '../config/axios';
const pathname = '/auth'

const login = (email, password) => {
	return axios({
		method: 'post',
		url: `${pathname}/login`,
		data: { email, password }
	})
		.then((res) => res.data)
		.catch((err) => {
			const messageError = (err.response && err.response.data && err.response.data.message) || 'login failed';
			throw new Error(messageError);
		});
};


export default {
	pathname,
	login
};
