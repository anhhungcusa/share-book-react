import { axios } from "../config/axios"

const pathname = '/giveaways'

const createGiveaway = ({
    categoryId, title, description, 
    giftImg, giftTitle, 
    begin, numParticipants
}, token) => {
    return axios({
        url: pathname,
        headers: {
            'Authorization': `Bearer ${token}`,
            
        },
        method: 'post',
        data: {
            categoryId, title, description, 
            giftImg, giftTitle, 
            begin, numParticipants
        }
    }).then(res => res.data.giveaway)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);         
        })
    }
    
const startGiveaway = (giveawayId, token, href) => {
    return axios({
        url: `${pathname}/${giveawayId}/start`,
        headers: {
            'Authorization': `Bearer ${token}`,
            
        },
        method: 'patch',
        params: {
            href
        }
    }).then(res => res.data.giveaway)
    .catch(err => {
        const messageError = (
            err.response && 
            err.response.data && 
            err.response.data.message) || 'action failed';
        throw new Error(messageError);         
    })
}

const updateWinnerInfo = ({fullname, address, phone, email}, giveawayId) => {
    return axios({
        url: `${pathname}/${giveawayId}`,
        method: 'patch',
        data: {
            fullname, address, phone, email
        }
    }).then(res => res.data.message)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);  
        })
}

const fetchGiveaways = (categoryId, ended, {skip, limit}) => {
    return axios({
        url: pathname,
        method: 'get',
        params: {
            categoryId, ended, skip, limit
        }
    }).then(res => res.data.giveaways)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'failed to fetch giveaways';
            throw new Error(messageError);  
        })
}

const removeGiveaway = (giveawayId, token) => {
    return axios({
        url: `${pathname}/${giveawayId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'delete',
    }).then(res => res.data.message)
        .catch(err => {
            const messageError = (
                err.response && 
                err.response.data && 
                err.response.data.message) || 'action failed';
            throw new Error(messageError);  
        })
}

const fetchRegistrationsOfGiveaway = (giveawayId) => {
    return axios({
        url: `${pathname}/${giveawayId}/registrations`,
        method: 'get'
    }).then(res => res.data.registrations)
    .catch(err => {
        const messageError = (
            err.response && 
            err.response.data && 
            err.response.data.message) || 'action failed';
        throw new Error(messageError);  
    })
}

export const GiveawayService =  {
    pathname,
    createGiveaway,
    startGiveaway,
    updateWinnerInfo,
    fetchGiveaways,
    removeGiveaway,
    fetchRegistrationsOfGiveaway
}