import React, { Component } from 'react';
import { Table } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/cryptoinfo';

class CryptoContent extends Component {
    componentWillMount() {
        this.props.actions.getInfo();
    }

    render() {
        const columnsTitles = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }];

        const dataSource = [{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
        }];

        return (
            <Table
                dataSource={dataSource}
                columns={columnsTitles}
                bordered={true}
            />
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        cryptoData: state.news
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoContent);