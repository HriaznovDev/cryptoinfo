import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/cryptoinfo';
import './CryptoContent.css';

const { Column } = Table;

class CryptoContent extends Component {
    componentWillMount() {
        this.props.actions.getInfo();
    }

    render() {
        let dataSource = [];
        const cryptoData = this.props.cryptoData ? this.props.cryptoData : {};
        const cryptoSiteUrl = 'https://www.cryptocompare.com';
        let counter = 0;

        for (let key in cryptoData) {
            dataSource = [
                ...dataSource,
                {
                    key: cryptoData[key].Id,
                    name: cryptoData[key].CoinName,
                    img: cryptoData[key].ImageUrl,
                    link: cryptoData[key].Url,
                    number: ++counter
                }
            ];
        }

        return (
            <div className="container">
                <Table
                    dataSource={dataSource}
                    bordered={true}
                    loading={this.props.tableLoading}
                    className="CryptoContent"
                >
                    <Column
                        title="#"
                        dataIndex="number"
                        key="number"
                    />
                    <Column
                        title="Logo"
                        dataIndex="logo"
                        key="logo"
                        render={(text, record) => (
                            <a href={cryptoSiteUrl + record.link}>
                                <img
                                    src={cryptoSiteUrl + record.img}
                                    className="CryptoContent__item-logo"
                                    alt={record.name}
                                    title={record.name}
                                />
                            </a>
                        )}
                    />
                    <Column
                        title="Coin Name"
                        dataIndex="name"
                        key="name"
                    />
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tableLoading: state.cryptoInfo.loading,
        cryptoData: state.cryptoInfo.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoContent);