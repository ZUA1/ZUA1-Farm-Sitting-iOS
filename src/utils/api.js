// const base_url = 'https://us-central1-farm-sitting-services.cloudfunctions.net';
const base_url = 'https://us-central1-shelby-donna-firestore.cloudfunctions.net/app'
// const base_url = "http://localhost:4000"
export const buyItem = async (token, item) => {
  try {
    console.log('/payWithStripe', {
      amount: parseFloat(item.price),
      currency: 'usd',
      token: token.tokenId,
    });
    const resp = await fetch(`${base_url}/payWithStripe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(item.price) * 100,
        currency: 'usd',
        token: token.tokenId,
      }),
    });
    let responseText = await resp.text();
    if (responseText) {
      const responseBody = JSON.parse(responseText);
      return resp.ok
        ? Promise.resolve(responseBody)
        : Promise.reject(responseBody);
    } else {
      return Promise.reject(responseText);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getBalanceTransaction = async (balance_transaction) => {
  console.log('# trying to get getBalanceTransaction :' + balance_transaction);
  try {
    const resp = await fetch(`${base_url}/getBalanceTransaction`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        balance_transaction,
      }),
    });

    //console.log('# resp:', resp);
    let responseText = await resp.text();
    console.log('# getBalanceTransaction:', responseText);

    if (responseText) {
      const responseBody = JSON.parse(responseText);
      return resp.ok
        ? Promise.resolve(responseBody)
        : Promise.reject(responseBody);
    } else {
      return Promise.reject(responseText);
    }
  } catch (error) {
    console.log('# getBalanceTransaction err:', error);
    return Promise.reject(error);
  }
};

export const getPayment = async (
  account,
  amount,
  currency,
  source_transaction,
) => {
  try {
    console.log('/transferWithStripe', {
      amount,
      currency,
      account,
      source_transaction,
    });
    const resp = await fetch(`${base_url}/transferWithStripe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        account,
        source_transaction,
      }),
    });
    let responseText = await resp.text();
    if (responseText) {
      const responseBody = JSON.parse(responseText);
      return resp.ok
        ? Promise.resolve(responseBody)
        : Promise.reject(responseBody);
    } else {
      return Promise.reject(responseText);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAuthInfo = async (authorizationCode) => {
  console.log(`${base_url}/getStripeInfo`)
  try {
    const resp = await fetch(`${base_url}/getStripeInfo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorizationCode,
      }),
    });

    console.log('# resp:', resp);

    let responseText = await resp.text();
    console.log(resp.status);
    console.log('# responseText:', responseText);

    if (responseText) {
      const responseBody = JSON.parse(responseText);
      return resp.ok
        ? Promise.resolve(responseBody)
        : Promise.reject(responseBody);
    } else {
      return Promise.reject(responseText);
    }
  } catch (error) {
    console.log('# getAuthInfo err:', error);
    return Promise.reject(error);
  }
};

export const getStripeAccount = async (stripeAccountId) => {
  try {
    const resp = await fetch(`${base_url}/getStripeAccount`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeAccountId,
      }),
    });

    //console.log('# resp:', resp);
    let responseText = await resp.text();
    console.log('# getStripeAccount response:', responseText);

    if (responseText) {
      const responseBody = JSON.parse(responseText);
      return resp.ok
        ? Promise.resolve(responseBody)
        : Promise.reject(responseBody);
    } else {
      return Promise.reject(responseText);
    }
  } catch (error) {
    console.log('# getStripeAccount err:', error);
    return Promise.reject(error);
  }
};
