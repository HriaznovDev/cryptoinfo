import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/cryptoInfo';
import './CryptoContent.css';
import ReactSVG from 'react-svg';

const { Column } = Table;
const Search = Input.Search;

class CryptoContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'searchValue': null
        }
    }

    componentDidMount() {
        this.props.actions.getInfo();
    }

    render() {
        const paginationSettings = {
            defaultPageSize: 15, 
            hideOnSinglePage: true
        };
        const CRYPTO_SITE_URL = 'https://www.cryptocompare.com';
        const BITCOIN_PRICE = this.props.bitcoinPrice ? this.props.bitcoinPrice : null;
        const SEARCH_VALUE = this.state.searchValue;
        let dataSource = [];
        const cryptoData = this.props.cryptoData ? this.props.cryptoData : {};

        if (Object.values(cryptoData).length !== 0) {
            Object.values(cryptoData).forEach((item, i) => {
                if (!SEARCH_VALUE) {
                    dataSource = [
                        ...dataSource,
                        {
                            key: item.Id,
                            dataName: item.Name,
                            name: item.CoinName,
                            img: item.ImageUrl,
                            link: item.Url,
                            isTrading: item.IsTrading,
                            price: item.Price,
                            number: ++i
                        }
                    ];
                } else {
                    if (item.CoinName.toLowerCase().includes(SEARCH_VALUE.toLowerCase())) {
                        dataSource = [
                            ...dataSource,
                            {
                                key: item.Id,
                                dataName: item.Name,
                                name: item.CoinName,
                                img: item.ImageUrl,
                                link: item.Url,
                                isTrading: item.IsTrading,
                                price: item.Price,
                                number: ++i
                            }
                        ];
                    }
                }
            });
        }

        return (
            <div className="container">

                <Search
                    placeholder="Search by coin name..."
                    onSearch={value => this.setState({'searchValue': value})}
                    enterButton
                    className="search-form"
                    size="large"
                />

                <Table
                    dataSource={dataSource}
                    bordered={true}
                    loading={this.props.tableLoading}
                    pagination={paginationSettings}
                    scroll={{x: true}}
                    className="CryptoContent"
                >
                    <Column
                        title="#"
                        dataIndex="number"
                        key="number"
                        width="7%"
                    />
                    <Column
                        title="Logo"
                        dataIndex="logo"
                        key="logo"
                        width="15%"
                        render={(text, record) => (
                            <a href={CRYPTO_SITE_URL + record.link}>
                                <img
                                    src={CRYPTO_SITE_URL + record.img}
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
                        title="Coin Trading"
                        dataIndex="isTrading"
                        key="isTrading"
                        width="15%"
                        render={(text, record) => (
                            record.isTrading ? (
                                <div style={{textAlign: 'center'}}>
                                    <ReactSVG path="/media/true.svg" className="CryptoContent__svg" />
                                </div>
                            ) : (
                                <div style={{textAlign: 'center'}}>
                                    <ReactSVG path="/media/false.svg" className="CryptoContent__svg" />
                                </div>
                            )
                        )}
                    />
                    <Column
                        title="Price"
                        dataIndex="price"
                        key="price"
                        width="20%"
                        render={(text, record) => (
                            (record.isTrading && record.price !== null) ? (
                                record.price ? (
                                    <div>
                                        <div>{record.price} <b>USD</b></div>
                                        <div>{(record.price / BITCOIN_PRICE).toFixed(9)} <b>BTC</b></div>
                                    </div>
                                ) : (<a onClick={() => this.props.actions.getPrice(record.dataName)}>Show price</a>)
                            ) : (
                                <div>Unknown price</div>
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
        cryptoData: state.cryptoInfo.data,
        bitcoinPrice: state.cryptoInfo.bitcoinPrice
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoContent);