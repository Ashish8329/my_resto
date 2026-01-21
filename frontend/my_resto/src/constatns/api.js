export const API_BASE_URL = import.meta.env.VITE_API_URL

export const ENDPOINTS = {
  RESTAURANT_MENU: "/menu/items/",
  LOGIN: "/auth/login",
  ORDERS: "/orders",
  CANCEL_ORDER: "/orders/cancel",
  SCANNER : "/staff/scan",
  KITCHEN_GET_ORDERS : "staff/chef/orders",

  // Table 
  TABLE_QR_UPDATE: "/restaurants/update-qr-code",
  TABLE_ENDPOINT : "/restaurant/restaurant-tables",

  // menu 
  MANAGE_MENU_ITEMS: "/menu/manage-items/",
}

export const LocalhostCred = 'qr_context'
export const TOKEN_KEY = 'My_Resto_token'
export const ADMIN_KEY = 'OWNER'

//  const context = {
//           restaurant_id: data.restaurant_id,
//           table_id: data.table_id,
//           qr_token: qrToken,
//         };
