const BASE_URL = 'https://billingproject-main.onrender.com/api/v1';

const AUTH_KEY = 'billing_auth_token';
const ADMIN_CREDENTIALS = {
  username: "admin_frontend",
  password: "AdminPassword123!",
  fullName: "Frontend System Admin"
};

let authPromise = null;

async function executeAuth() {
  let token = sessionStorage.getItem(AUTH_KEY);
  if (token) return token;

  try {
    let res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: ADMIN_CREDENTIALS.username, password: ADMIN_CREDENTIALS.password })
    });
    
    if (!res.ok) {
      res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ADMIN_CREDENTIALS)
      });
    }

    if (res.ok) {
      const data = await res.json();
      token = data.data?.token || data.token;
      if (token) sessionStorage.setItem(AUTH_KEY, token);
      return token;
    }
  } catch (err) {
    console.error("Auth auto-login failed", err);
  }
  return null;
}

function ensureAuth() {
  if (!authPromise) {
    authPromise = executeAuth().then(token => {
      authPromise = null; // reset so it can trigger again if needed
      return token;
    });
  }
  return authPromise;
}

async function fetchAPI(endpoint, options = {}) {
  let token = await ensureAuth();
  const url = `${BASE_URL}${endpoint}`;
  try {
    let response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      sessionStorage.removeItem(AUTH_KEY);
      token = await ensureAuth(); // Try getting a fresh token once
      if (token) {
        response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
          },
        });
      }
    }

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return null;
    }
    
    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }
    return result.data;
  } catch (error) {
    console.error(`Error with API ${endpoint}:`, error);
    throw error;
  }
}

async function fetchAPIForm(endpoint, formData) {
  let token = await ensureAuth();
  const url = `${BASE_URL}${endpoint}`;
  try {
    let response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    if (response.status === 401) {
      sessionStorage.removeItem(AUTH_KEY);
      token = await ensureAuth(); 
      if (token) {
        response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    }

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return null;
    }
    
    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }
    return result.data;
  } catch (error) {
    console.error(`Error with API ${endpoint}:`, error);
    throw error;
  }
}

// Categories
export const getCategories = () => fetchAPI('/categories');

// Products
export const getProducts = (categoryId = '', search = '') => {
  let query = '';
  if (categoryId) query += `categoryId=${categoryId}&`;
  if (search) query += `search=${search}&`;
  return fetchAPI(`/products?${query}`);
};

export const getAdminProductsWithPrices = async (categoryId = '') => {
  const products = await getProducts(categoryId);
  try {
    const customers = await getCustomers();
    const dummy = customers.find(c => c.partyName === '__Admin_Pricing_Lookup__');
    if (dummy) {
      const prices = await getBillReadyCatalog(dummy.id);
      return products.map(p => {
        const priceData = prices.find(pr => pr.productId === p.id);
        return {
          ...p,
          basePrice: priceData ? priceData.effectivePrice : 0
        };
      });
    }
  } catch (err) {
    console.error("Failed to load admin pricing lookup", err);
  }
  return products; // fallback
};

export const getCustomerProductsWithPrices = async (customerId, categoryId = '') => {
  const products = await getProducts(categoryId);
  if (!customerId) return products;
  try {
    const prices = await getBillReadyCatalog(customerId);
    return products.map(p => {
      const priceData = prices.find(pr => pr.productId === p.id);
      return {
        ...p,
        basePrice: priceData ? priceData.effectivePrice : 0,
        hasCustomPrice: priceData ? priceData.hasCustomPrice : false
      };
    });
  } catch (err) {
    console.error("Failed to load customer pricing lookup", err);
  }
  return products;
};
export const getProductById = (id) => fetchAPI(`/products/${id}`);
export const createProduct = (productData) => fetchAPI('/products', { method: 'POST', body: JSON.stringify(productData) });
export const updateProduct = (id, productData) => fetchAPI(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });
export const deleteProduct = (id) => fetchAPI(`/products/${id}`, { method: 'DELETE' });
export const updateProductStock = (id, quantity, operation = 'set') => fetchAPI(`/products/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ quantity, operation }) });
export const uploadProductImage = (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchAPIForm(`/products/${id}/image`, formData);
};

// Customers
export const getCustomers = () => fetchAPI('/customers');
export const createCustomer = (customerData) => fetchAPI('/customers', { method: 'POST', body: JSON.stringify(customerData) });
export const updateCustomer = (id, customerData) => fetchAPI(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(customerData) });

// Customer Pricing
export const getBillReadyCatalog = (customerId) => fetchAPI(`/customers/${customerId}/pricing/bill-ready`);

// Invoices
export const createInvoice = (invoiceData) => fetchAPI('/invoices', { method: 'POST', body: JSON.stringify(invoiceData) });
export const getInvoiceById = (id) => fetchAPI(`/invoices/${id}`);