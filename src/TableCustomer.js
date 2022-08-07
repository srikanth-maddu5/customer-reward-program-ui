import React from 'react';
import { Table } from 'antd';
import { customer_table_columns, transaction_table_columns } from './utils';

import PropTypes from 'prop-types';

function TableCustomer(props) {

    const { customerData, transactionData } = props;

    const expandedRowRender = record => {
        return ( 
            <React.Fragment>
                <h3>Transaction Summary</h3>
                <Table
                    rowKey={() => Math.floor(Math.random() * 100000) + 1}
                    columns = {transaction_table_columns}
                    dataSource = {transactionData.filter(o => 
                        o['customer_id'] === record['customer_id'])}
                    pagination = {{ 
                        position: ['bottomCenter'], 
                        hideOnSinglePage: true,
                        style:{ marginTop: 32 }, 
                        size: 'small',
                        pageSize: 10
                    }}
                />
            </React.Fragment>
        );
    };

  return (
    <Table 
        rowKey={o => o['customer_id']}
        dataSource={customerData}
        columns={customer_table_columns}
        expandable={{
            expandedRowRender,
            expandRowByClick: true
        }}
        pagination={{ 
            position: ['bottomLeft'], 
            size: 'small',
            pageSize: 10,
            hideOnSinglePage: true
        }}
    />
  );
}

TableCustomer.prototype = {
    customerData: PropTypes.array,
    transactionData: PropTypes.array
}

export default TableCustomer;
