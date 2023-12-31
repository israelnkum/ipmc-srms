import {Button, Table, Tag} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllBatches} from "../../actions/batches/BatchAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import BatchActions from "./batch-actions";
import {Link, useLocation} from "react-router-dom";

const {Column} = Table

function AllBatches(props) {
    const {getBatches, batches, filter} = props
    const {pathname} = useLocation()
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const {data, meta} = batches
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Batches', addLink: '/batches/form', buttonText: 'Batches'})

        if (pathname === '/my-batches') {
            filter.staff_id = loggedInUser.staff_id
        }
        filter.program_id = 'all'
        getBatches(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const colors = {
        current: 'blue',
        completed: 'green',
        pending: 'red'
    }
    return (
        <div className={'pb-10'}>
            {/*<FilterGetBatches/>*/}
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getBatches}
                data={data} meta={meta}>
                <Table.Column title={'Students'} render={(text, {program, status}) => (
                    <>
                        <p>{program}</p>
                        <Tag color={colors[status]}>{status}</Tag>
                    </>
                )}/>
                <Column title="Program" dataIndex={''}/>
                <Column title="room" dataIndex={'room'}/>
                <Column title="instructor" dataIndex={'staff'}/>
                <Column title="start time" dataIndex={'batch_time'}/>
                <Column title="start date" dataIndex={'start_date'}/>
                <Column title="end date" dataIndex={'end_date'}/>
                <Table.Column title={'Students'} render={(text, record) => (
                    record.students > 0 ?
                        <Link to={'students'} state={{data: record}} className={'!no-underline'}>
                            <Button type={'primary'} size={'small'} icon={<>{record.students}</>}>&nbsp;View</Button>
                        </Link> : <>{record.students}</>
                )}/>
                <Table.Column title={'Actions'} render={(text, record) => (
                    <BatchActions record={record}/>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllBatches.propTypes = {
    pageInfo: PropTypes.object,
    getBatches: PropTypes.func,
    batches: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    batches: state.batchReducer.batches,
    filter: state.batchReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getBatches: (payload) => dispatch(handleGetAllBatches(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBatches)
