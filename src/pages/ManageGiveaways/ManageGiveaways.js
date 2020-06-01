import React, { useContext, useEffect, useState } from 'react'
import './ManageGiveaways.css'
import moment from 'moment'
import { DataContext } from '../../context/DataProvider'
import { Button, message, Table, Space } from 'antd'
import { CreateGiveawayModal } from '../../components/modals/CreateGiveawayModal/CreateGiveawayModal'
import { CategoryService } from '../../services/category'
import { GiveawayService } from '../../services/giveaway'
import { UserService } from '../../services/user'
export const ManageGiveawaysPage = () => {
    const {
        state: { loads, initLoads, categories, auth, myGiveaways },
        action: {
            setMyGiveaways,
            addGiveaway,
            setLoading,
            setInitLoading,
            addCategory, setCategories }
    } = useContext(DataContext)
    useEffect(() => {
        if (!auth.user) return
        if (initLoads.categories === false) {
            setLoading('categories', true)
            CategoryService.fetchCategories()
                .then(categories => {
                    setCategories(categories)
                }).catch(err => {
                    message.error(err.message)
                }).finally(_ => {
                    setLoading('categories', false)
                    setInitLoading('categories', true)
                    // set
                })
        }
        if (initLoads.myGiveaways === false) {
            setLoading('myGiveaways', true)
            UserService.fetchGiveawaysByUser(auth.user._id, auth.token, { skip: 0, limit: 100 })
                .then(giveaways => {
                    setMyGiveaways(giveaways)
                })
                .catch(err => {
                    message.error(err.message)
                }).finally(_ => {
                    setLoading('myGiveaways', false)
                    setInitLoading('myGiveaways', true)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [actionLoading, setActionLoading] = useState(false)
    const [clickedGiveawayId, setClickedGiveawayId] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)

    const openModal = () => setVisibleModal(true)
    const closeModal = () => setVisibleModal(false)
    // handle for giveaway
    const addNewGiveaway = (giveaway) => {
        setLoading('myGiveaways', true)
        setLoading('publicGiveaways', true)
        return GiveawayService.createGiveaway(giveaway, auth.token)
            .then(giveaway => {
                addGiveaway(giveaway)
                return true
            }).catch(err => {
                message.error(err.message)
                return false
            }).finally(res => {
                setLoading('myGiveaways', false)
                setLoading('publicGiveaways', false)
                return res
            })
    }

    const startGiveaway = ({_id: giveawayId, begin}) => {
        const current = Date.now()

        if(current < new Date(begin)) {
            message.error('current time must be larger than begin')
            return
        }
        setClickedGiveawayId(giveawayId)
        setActionLoading(true)
        GiveawayService.startGiveaway(giveawayId, auth.token)
            .then(giveaway => {
                // do something
                UserService.fetchGiveawaysByUser(auth.user._id, auth.token, { skip: 0, limit: 100 })
                .then(giveaways => {
                    setMyGiveaways(giveaways)
                })
                .catch(err => {
                    message.error(err.message)
                }).finally(_ => {
                    setLoading('myGiveaways', false)
                    setInitLoading('myGiveaways', true)
                })
            })
            .catch(err => message.error(err.message))
            .finally(_ => setActionLoading(false))
    }
    const removeGiveaway = (giveawayId) => {
        setClickedGiveawayId(giveawayId)
        setActionLoading(true)
        GiveawayService.removeGiveaway(giveawayId, auth.token)
            .then(giveaway => {
                // do something
                UserService.fetchGiveawaysByUser(auth.user._id, auth.token, { skip: 0, limit: 100 })
                .then(giveaways => {
                    setMyGiveaways(giveaways)
                })
                .catch(err => {
                    message.error(err.message)
                }).finally(_ => {
                    setLoading('myGiveaways', false)
                    setInitLoading('myGiveaways', true)
                })
            })
            .catch(err => message.error(err.message))
            .finally(_ => {
                setActionLoading(false)
            })
    }
    
    const addNewCategory = (name) => {
        setLoading('categories', true)
        const category = { name }
        CategoryService.createCategory(category, auth.token)
            .then(category => {
                addCategory(category)
            }).catch(err => {
                message.error(err.message)
            }).finally(_ => setLoading('categories', false))
    }

    const columns = [
        {
            key: 'category',
            title: 'category',
            align: 'center',            
            dataIndex: 'category',
            render: category => category.name
        },
        {
            key: 'title',
            title: 'title',
            align: 'center',   
            dataIndex: 'title',
        },
        {
            key: 'description',
            title: 'description',
            align: 'center',   
            dataIndex: 'description',
        },
        {
            key: 'numParticipants',
            title: 'number of \n participants',
            width: '50px',
            align: 'center',   
            dataIndex: 'numParticipants',
        },
        {
            key: 'start-end',
            title: 'start - end',
            align: 'center',   
            render: giveaway => (
                <Space direction='vertical'>
                    {moment(giveaway.begin).format('DD-MM-YYYY ss:mm:HH')}
                    - 
                    {
                        giveaway.end ? moment(giveaway.end).format('DD-MM-YYYY ss:mm:HH') : 'empty'
                    }
                </Space>
            )
        },
        {
            title: 'gift',
            align: 'center',   
            children: [
                {
                    key: 'giftTitle',
                    title: 'title',
                    align: 'center',   
                    dataIndex: 'gift',
                    render: gift => gift.title
                },
                {
                    key: 'giftImg',
                    title: 'image',
                    align: 'center',   
                    dataIndex: 'gift',
                    // width: '100px',
                    render: gift => {
                        return <img style={{maxWidth: '100px', height: 'auto'}}  src={gift.image} alt="gift-img" />
                    }
                },
            ]
        },
        {
            title: 'result',
            align: 'center',   
            children: [
                {
                    key: 'winnerEmail',
                    title: 'email',
                    align: 'center',   
                    dataIndex: 'result',
                    render: result => result && result.winnerEmail ?  result.winnerEmail : 'empty'
                },
                {
                    key: 'winningNumbers',
                    title: 'lucky number',
                    align: 'center',   
                    dataIndex: 'result',
                    render: result => result ?  result.winningNumbers : 'empty'
                },
                {
                    key: 'winnerInfo',
                    title: 'info',
                    align: 'center',   
                    dataIndex: 'result',
                    render: result => result && result.winnerInfo ?  (
                        <Space direction='vertical'>
                            <span>fullname: {result.winnerInfo.fullname}</span>
                            <span>address: {result.winnerInfo.address}</span>
                            <span>phone: {result.winnerInfo.phone}</span>
                        </Space>
                    ) : 'empty'
                },
            ]
        },
        {
            key: 'action',
            title: 'action',
            align: 'center',   
            render: giveaway => {
                return (
                    <Space direction='vertical'>
                        {
                            !giveaway.result &&
                            <Button 
                            loading={ clickedGiveawayId  === giveaway._id ? actionLoading : false }  
                            onClick={() => startGiveaway(giveaway)}>start</Button>
                        }
                        <Button 
                        loading={ clickedGiveawayId  === giveaway._id ? actionLoading : false }
                        onClick={() => removeGiveaway(giveaway._id)}>remove</Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <div className="manage-giveaways-page container">
            <Button className="m-y-10" onClick={openModal}>new</Button>
            <CreateGiveawayModal
                close={closeModal}
                visible={visibleModal}
                categories={categories}
                loadingGiveaway={loads.myGiveaways}
                loadingCategory={loads.categories}
                addNewCategory={addNewCategory}
                addNewGiveaway={addNewGiveaway}
            />
            <div className="giveaway-list">
                <Table
                    bordered
                    size='small' 
                    pagination={{ size: 10 }}
                    rowKey={giveaway => giveaway._id}
                    dataSource={myGiveaways}
                    loading={loads.myGiveaways}
                    columns={columns}

                />
            </div>

        </div>
    )
}