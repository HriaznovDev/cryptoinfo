import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/cryptoInfo';
import './CryptoContent.css';

const { Column } = Table;

class CryptoContent extends Component {
    componentDidMount() {
        this.props.actions.getInfo();
    }

    render() {
        let dataSource = [];
        const paginationSettings = {
            defaultPageSize: 15, 
            hideOnSinglePage: true
        };
        const cryptoData = this.props.cryptoData ? this.props.cryptoData : {};
        const cryptoSiteUrl = 'https://www.cryptocompare.com';

        if (Object.values(cryptoData).length !== 0) {
            Object.values(cryptoData).forEach((item, i) => {
                dataSource = [
                    ...dataSource,
                    {
                        key: item.Id,
                        dataName: item.Name,
                        name: item.CoinName,
                        img: item.ImageUrl,
                        link: item.Url,
                        price: item.Price,
                        number: ++i
                    }
                ]; 
            });
        }

        return (
            <div className="container">
                <Table
                    dataSource={dataSource}
                    bordered={true}
                    loading={this.props.tableLoading}
                    pagination={paginationSettings}
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
                    <Column
                        title="Price"
                        dataIndex="price"
                        key="price"
                        render={(text, record) => (
                            record.price ? (
                                <span>{record.price + '$'}</span>
                            ) : (
                                <a onClick={() => this.props.actions.getPrice(record.dataName)}>Show price</a>
                            )
                        )}
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