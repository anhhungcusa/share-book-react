import { axios } from '../config/axios';

const pathname = '/categories';

const createCategory = ({ name }, token) => {
	return axios({
		url: pathname,
		headers: {
			Authorization: `Bearer ${token}`
		},
		method: 'post',
		data: {
			name
		}
	})
		.then((res) => res.data.category)
		.catch((err) => {
			const messageError =
				(err.response && err.response.data && err.response.data.message) || 'action failed';
			throw new Error(messageError);
		});
    };
    
    const fetchCategories = (token) => {
        return axios({
            url: pathname,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'get',
        }).then(res => res.data.categories)
        .catch(err => {
            const messageError =
                (err.response && err.response.data && err.response.data.message) || 'failed to fetch category';
            throw new Error(messageError);         
        })
}

export const CategoryService =  { pathname, createCategory, fetchCategories };
