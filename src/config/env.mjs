export const cfg = {
  tokenBaseUrl: process.env.TOKEN_BASE_URL,
  appConfigUrl: process.env.APP_CONFIG_URL,
  shopUrl: process.env.SHOP_URL,
  checkout: {
    init: process.env.CHECKOUT_INIT_URL,
    pax: process.env.CHECKOUT_PASSENGERS_URL,
    update: process.env.CHECKOUT_UPDATE_URL,
    confirm: process.env.CHECKOUT_CONFIRM_URL,
    retrieve: process.env.RETRIEVE_ORDER_URL
  },
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE
  }
};
