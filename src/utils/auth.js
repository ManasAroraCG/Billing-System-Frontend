function getAuthToken() {
  return sessionStorage.getItem("token") || "";
}

export default getAuthToken;