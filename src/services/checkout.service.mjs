import { GqlClient } from '../utils/gqlClient.mjs';

export async function checkoutInitiate({ baseURL, token, input }) {
  const client = new GqlClient({ baseURL, headers: { Authorization: token } });
  await client.init();
  const query = `
    mutation CheckoutInitiate($input: CheckoutInitiateInput!) {
      checkoutInitiate(input: $input) {
        checkoutId
        totals { amount currency }
      }
    }`;
  const data = await client.execute({ query, variables: { input } });
  await client.dispose();
  return data.checkoutInitiate;
}

export async function checkoutPassengers({ baseURL, token, input }) {
  const client = new GqlClient({ baseURL, headers: { Authorization: token } });
  await client.init();
  const query = `
    mutation CheckoutPassengers($input: CheckoutPassengersInput!) {
      checkoutPassengers(input: $input) {
        checkoutId
        passengers { id type firstName lastName }
      }
    }`;
  const data = await client.execute({ query, variables: { input } });
  await client.dispose();
  return data.checkoutPassengers;
}

export async function checkoutUpdate({ baseURL, token, input }) {
  const client = new GqlClient({ baseURL, headers: { Authorization: token } });
  await client.init();
  const query = `
    mutation CheckoutUpdate($input: CheckoutUpdateInput!) {
      checkoutUpdate(input: $input) {
        checkoutId
        totals { amount currency }
      }
    }`;
  const data = await client.execute({ query, variables: { input } });
  await client.dispose();
  return data.checkoutUpdate;
}

export async function checkoutConfirm({ baseURL, token, input }) {
  const client = new GqlClient({ baseURL, headers: { Authorization: token } });
  await client.init();
  const query = `
    mutation CheckoutConfirm($input: CheckoutConfirmInput!) {
      checkoutConfirm(input: $input) {
        orderId
        totals { amount currency }
        status
      }
    }`;
  const data = await client.execute({ query, variables: { input } });
  await client.dispose();
  return data.checkoutConfirm;
}

export async function retrieveOrder({ baseURL, token, input }) {
  const client = new GqlClient({ baseURL, headers: { Authorization: token } });
  await client.init();
  const query = `
    query RetrieveOrder($input: RetrieveOrderInput!) {
      retrieveOrder(input: $input) {
        orderId
        status
        passengers { id firstName lastName }
        segments { id origin destination }
        totals { amount currency }
      }
    }`;
  const data = await client.execute({ query, variables: { input } });
  await client.dispose();
  return data.retrieveOrder;
}
