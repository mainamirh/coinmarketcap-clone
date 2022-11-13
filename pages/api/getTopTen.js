// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const getData = async () => {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.COINMARKETCAP_API_KEY}`,
      {
        method: "GET", // We are getting information.
        headers: {
          Accept: "*/*", // Accept everything that server sends.
        },
      }
    );

    const data = await response.json();

    res.status(200).json({ data });
  };

  getData();
}
