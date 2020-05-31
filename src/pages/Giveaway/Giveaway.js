import React, { useContext, useEffect } from 'react'
import './Giveaway.css'
import { DataContext } from '../../context/DataProvider'

export const GiveawayPage = () => {
    const {
        state: {publicGiveaways, loads}, 
        action: {setPublicGiveaways, setLoading}
    } = useContext(DataContext)
    useEffect(() => {

    })
    return (
        <div className="giveaway-page">
            <h1 className="title">RECEIVE BOOK FREE!!!</h1>
            <div className="categories">
                
            </div>
            <div className="giveaway-list">

            </div>
        </div>
    )
}