import { render, screen } from '@testing-library/react';
import PageCustomerReward from './PageCustomerReward';

test('test page customer table component error message', () => {
    const { asFragment } = render(<PageCustomerReward 
        customerData={[]}
        transactionData={[]}
        spinner={false}
        error={'unable to retrive data'}
    />);

    // check page header
    expect(screen.getByRole('heading')).toHaveTextContent('Customer Reward Portal');

    // check error message 
    expect(asFragment()).toMatchSnapshot(`<div class="ant-result-subtitle">unable to retrive data</div>`);
});