export const customer_table_columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Total Reward Points',
      dataIndex: 'totalReward',
      key: 'totalReward',
      render: text => Intl.NumberFormat('en-US').format(text)
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: text => text.split(',').map((o, i) => <p key={i}>{o}</p>)
    },
  ];
  

export const transaction_table_columns = [
    {
        title: 'Date',
        dataIndex: 'transaction_date',
        key: 'transaction_date'
    },
    {
        title: 'Transaction Amount',
        dataIndex: 'transaction_amount',
        key: 'transaction_amount',
        render: text => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(text)
    },
    {
        title: 'Reward Points',
        dataIndex: 'rewardPoints',
        key: 'rewardPoints',
        render: text => Intl.NumberFormat('en-US').format(text)
    }
];

export const keyBy = (array, id) => {
  let newObject = {};
  const data = JSON.parse(JSON.stringify(array));
  ( data instanceof Array ) && data.forEach(o => {
    const idValue = o[id];
    if(newObject[idValue]) {
      newObject[idValue].push(o);
    } else {
      newObject[idValue] = [];
      newObject[idValue].push(o);
    }
  });
  return newObject;
}

export async function getData(setSpinner) {
  
  const obj = {};
  
  try {
    
    setSpinner(true);

    // fetch customer data
    const customerDataFetch = await fetch('./customers.json');
    const customerData = await customerDataFetch.json();

    // fetch transaction data
    const transactionDataFetch = await fetch('./transactions.json');
    const transactionData = await transactionDataFetch.json();

    let data = transactionData || [];
    ( data instanceof Array ) && data.forEach(o => {
      // calculate reward points
      let rewardPoints = 0;
      let amount = o['transaction_amount'];
      amount = parseInt(amount);
      if(amount > 100) {
        rewardPoints = ( 50 * 1 ) + ( ( amount - 100 ) * 2 );
      } else if ( amount > 50 && amount <= 100 ) {
        rewardPoints = ( amount - 50 ) * 1;
      } else {
        rewardPoints = 0;
      }
      o['rewardPoints'] = rewardPoints;
    });

    const keyByTransactionData = keyBy(transactionData, 'customer_id');
    // customer data
    ( customerData instanceof Array ) && customerData.forEach(t => {
      const custTrans = keyByTransactionData[t['customer_id']];
      let totalR = ( custTrans instanceof Array ) && custTrans.reduce((p, c) => 
        p + Number(c['rewardPoints']), 0);
      t['totalReward'] = totalR;
    });
    
    // push data to object
    obj['customerData'] = customerData;
    obj['transactionData'] = data;
    obj['error'] = null;

  } catch(e) {
    obj['error'] = e.message;
  } finally {
    setSpinner(false);
  }
  return obj;
}