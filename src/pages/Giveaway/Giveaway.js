import React, { useContext, useEffect, useState, useMemo } from 'react'
import './Giveaway.css'
import { DataContext } from '../../context/DataProvider'
import { GiveawayService } from '../../services/giveaway'
import { message, Row, Col, List, Divider } from 'antd'
import { CategoryService } from '../../services/category'
import { CategoryList } from '../../components/CategoryList/CategoryList'
import { GiveawayCard } from '../../components/GiveawayCard/GiveawayCard'

export const GiveawayPage = () => {
    const {
        state: {publicGiveaways, loads, initLoads, categories}, 
        action: {
            setPublicGiveaways, 
            setLoading, setInitLoading,
            setCategories,
        }
    } = useContext(DataContext)
    useEffect(() => {
        if(initLoads.publicGiveaways === false) {
            setLoading('publicGiveaways', true)
            GiveawayService.getGiveaways(null, null, {skip: 0, limit: 100})
                .then(giveaways => {
                    setPublicGiveaways(giveaways)
                    setInitLoading('publicGiveaways', true)
                })
                .catch(err => {
                    message.error(err.message)
                })
                .finally(_ => {
                    setLoading('publicGiveaways', false)
                })
        }
        if (initLoads.categories === false) {
            setLoading('categories', true)
            CategoryService.fetchCategories()
                .then(categories => {
                    setCategories(categories)
                    setInitLoading('categories', true)
                }).catch(err => {
                    message.error(err.message)
                }).finally(_ => {
                    setLoading('categories', false)
                })
        }
    }, [])
    const defaultSelectedCategory = useMemo(() => ({name: 'all', _id: 'all'}), [])
    const [selectedCategoryId, setSelectedCategoryId] = useState(defaultSelectedCategory._id)
    const selectCategory = (id) => {
        if(id === selectedCategoryId) return
        setSelectedCategoryId(id)
    }
    const [displayGiveaways, setDisplayGiveaways] = useState(null)
    const [activeGiveaways, stoppedGiveaways] = useMemo(() => {
        if(!displayGiveaways) return [null, null]
        return displayGiveaways.reduce((acc, giveaway) => {
            if(!giveaway.result) {
                if(acc[0] === undefined) acc[0] = []
                let [activeGiveaways] = acc
                activeGiveaways.push(giveaway)
            } else {
                if(acc[1] === undefined) acc[1] = []
                // eslint-disable-next-line no-unused-vars
                let [ _ , stopGiveaways = []] = acc
                stopGiveaways.push(giveaway)
            }
            console.log(acc)
            return acc
        }, [undefined, undefined])
    }, [displayGiveaways])
    useEffect(() => {
        if(!publicGiveaways) return
        if(selectedCategoryId === defaultSelectedCategory._id) {
            setDisplayGiveaways(publicGiveaways)
            return
        }
        const filteredDisplayGiveaways = publicGiveaways.filter(giveaway => giveaway.category._id === selectedCategoryId)
        setDisplayGiveaways(filteredDisplayGiveaways)
    }, [defaultSelectedCategory._id, publicGiveaways, selectedCategoryId])
    return (
        <div className="giveaway-page">
            <h1 className="title">RECEIVE BOOK FREE!!!</h1>
            <div className='row-wrapper'>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        <div className="category-list">
                            <CategoryList 
                                onChangeSelectedCategory={selectCategory}
                                selectedCategoryId={selectedCategoryId}
                                categories={categories !== null && [defaultSelectedCategory, ...categories]}
                                loading={loads.categories}
                                defaultSelectedCategory={defaultSelectedCategory}
                                />
                        </div>
                    </Col>
                    <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                        <div className="giveaway-list">
                            <Divider>Active Giveaways</Divider>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 4,
                                    xl: 4,
                                  }}
                                loading={loads.publicGiveaways}
                                dataSource={activeGiveaways ? activeGiveaways: undefined}
                                renderItem={giveaway => (
                                    <List.Item>
                                        <GiveawayCard  giveaway={giveaway}/>
                                    </List.Item>
                                )}
                            />
                            <Divider>Stopped Giveaways</Divider>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 4,
                                    xl: 4,
                                  }}
                                loading={loads.publicGiveaways}
                                dataSource={stoppedGiveaways ? stoppedGiveaways: undefined}
                                renderItem={giveaway => (
                                    <List.Item>
                                        <GiveawayCard  giveaway={giveaway}/>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}