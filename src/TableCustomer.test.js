import {
  render,
  fireEvent
} from '@testing-library/react';

import TableCustomer from './TableCustomer';

const customerData = [{
  "customer_id": 1,
  "age": 30,
  "name": "Eliza Webster",
  "gender": "female",
  "email": "elizawebster@nurplex.com",
  "phone": "+1 (944) 565-3923",
  "address": "996 Poplar Street, Grandview, Hawaii, 9040",
  "totalReward": 76
}];

const transactionData = [{
  "customer_id": 1,
  "transaction_date": "2017-02-12",
  "transaction_amount": 113,
  "totalReward": 76
}];

test('customer table with data', () => {
  
    const { container, asFragment, getByText,getAllByRole} = render( <TableCustomer 
        customerData = {customerData}
        transactionData = {transactionData}
      />
    );

    // calculate reward points
    const amount = transactionData[0].transaction_amount;
    let rewardPoints = (50 * 1) + ((amount - 100) * 2);

    // check customer id & reward points
    expect(getAllByRole('row')[1]).toHaveTextContent(customerData[0].customer_id);
    expect(getAllByRole('row')[1]).toHaveTextContent(Intl.NumberFormat('en-US').format(rewardPoints));

    const expandIcon = container.querySelector('table tbody tr td button');
    fireEvent.click(expandIcon);

    expect(asFragment).toMatchSnapshot(`<h3>Transaction Summary</h3>`);

    // verify transaction date
    expect(getByText(transactionData[0].transaction_date)).toBeInTheDocument();
});

test('customer table with out test data', () => {
  
  const { getAllByRole} = render( <TableCustomer 
      customerData = {[]}
      transactionData = {[]}
    />
  );

  // check customer id & reward points
  expect(getAllByRole('row')[1]).toMatchSnapshot(`<div class="ant-empty-image">`)
});
