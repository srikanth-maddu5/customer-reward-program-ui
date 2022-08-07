import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Result, Spin } from 'antd';

import TableCustomer from './TableCustomer';

const { Header, Content } = Layout;

function PageCustomerReward(props) {

  const { customerData, transactionData, spinner, error } = props;

  return (
    <Layout className='layout'>
      <Header style={{ backgroundColor: '#004165', textAlign: 'center' }}>
        <h2 style={{ color: 'whitesmoke' }}>Customer Reward Portal</h2></Header>
      <Layout>
        <Content className='site-layout-content'>
          <Spin spinning={spinner}>
          { error ? (
            <Result 
              status={'error'} 
              title={'Customer Data Retrival Failed!'}
              subTitle={error}
            />
          ) : (
            <TableCustomer 
              customerData={customerData} 
              transactionData={transactionData} 
            />
          )}
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}

PageCustomerReward.prototype = {
  customerData: PropTypes.array,
  transactionData: PropTypes.array,
  spinner: PropTypes.bool,
  error: PropTypes.string
}

export default PageCustomerReward;
