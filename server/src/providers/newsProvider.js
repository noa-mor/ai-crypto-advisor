const url = "https://cryptopanic.com/api/developer/v2/posts/";

const newsProvider = async (user) => {
  const params = {
    auth_token: process.env.CRYPTOPANIC_TOKEN,
    public: "true",
    kind: "news",
    page: 1,
  };

  const queryParams = new URLSearchParams(params);
  const currencies = user.preference.assets.join(",");
  const urlWithParams = `${url}?${queryParams.toString()}&currencies=${currencies}`;
  const response = await fetch(urlWithParams);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseJson = await response.json();

  return responseJson;
};

module.exports = newsProvider;
