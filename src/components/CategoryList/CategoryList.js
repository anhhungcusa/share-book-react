import React from 'react'
import './CategoryList.css'
import { List } from 'antd'

export const CategoryList = ({
    categories , loading,
    onChangeSelectedCategory,
    selectedCategoryId,
}) => {
    return (
        <List
            
            className="categories"
            header={<div>Categories</div>}
            bordered
            dataSource={categories ? categories : undefined}
            loading={loading}
            renderItem={category => (
                <List.Item 
                    onClick={() => onChangeSelectedCategory(category._id)}
                     className={
                         `categories__item${selectedCategoryId === category._id ? '--active': ''}`
                         }>
                    {category.name}
                </List.Item>
            )}
        />
    )
}