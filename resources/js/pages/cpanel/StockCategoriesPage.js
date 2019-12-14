import React, { Component } from 'react'
import { Button, Empty, Icon, List, Result, Spin, Tooltip } from 'antd'
import { connect }  from 'react-redux'

import { DeleteStockCategoryButton, StockCategoryFormModal } from '~/components'
import DefaultLayout from '~/layouts'
import { fetchStockCategories, openStockCategoryAddingModal } from '~/scripts/redux/actions'

class StockCategoriesPageContainer extends Component {   

    componentDidMount() {
        this.props.dispatch(fetchStockCategories())
    }

    render() {
        const { stockCategories, isStockCategoryAddingModalOpen, dispatch } = this.props

        let content
        if (stockCategories.data && !stockCategories.error) {
            content = (
                <List dataSource={stockCategories.data} size="large" bordered
                    renderItem={
                        item => (
                            <List.Item key={item.object_id}
                                actions={[
                                    <Button><Icon type="edit" /> แก้ไข</Button>,
                                    <DeleteStockCategoryButton object_id={item.object_id} />
                                ]}
                            >
                                <List.Item.Meta
                                    title={`${item.title}${!item.is_visible ? (<Tooltip title="ถูกซ่อนไว้">&nbps;<Icon type="disconnect" /></Tooltip>) : ''}`}
                                    description={item.description}
                                />
                            </List.Item>
                        )
                    }
                />
            )
        }
        else if (stockCategories.error) {
            content = (
                <Result
                    status="error"
                    title="พบข้อผิดพลาด"
                    subTitle={(
                        <>
                            เกิดข้อผิดพลาดขณะโหลดข้อมูล โปรดรีเฟรชหน้านี้ หรือลองอีกครั้งในภายหลัง<br />
                            <small>(รหัสข้อผิดพลาด: {stockCategories.error.response.status})</small>
                        </>
                    )}
                />
            )
        }
        else {
            content = (<Empty description="ยังไม่มีหมวดหมู่พัสดุ กด &quot;เพิ่ม&quot; เพื่อเพิ่มหมวดหมู่พัสดุ"/>)
        }

        return (
            <DefaultLayout title="ประเภทพัสดุ"
                operationBtn={
                    <Button type="primary" onClick={() => dispatch(openStockCategoryAddingModal(true))}>เพิ่ม</Button>
                }
            >
                <Spin tip="กำลังโหลด..." spinning={stockCategories.loading}>
                    {content}
                </Spin>
                <StockCategoryFormModal visible={isStockCategoryAddingModalOpen} />
            </DefaultLayout>
        );
    }
}

const mapStateToProps = state => ({
    isStockCategoryAddingModalOpen: state.cpanelStockCategoryAddingModal,
    stockCategories: state.stockCategories
})

const StockCategoriesPage = connect(mapStateToProps)(StockCategoriesPageContainer)

export default StockCategoriesPage