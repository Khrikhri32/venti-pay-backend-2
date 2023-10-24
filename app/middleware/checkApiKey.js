const { API_KEY } = process.env;

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['key']; 
  console.log(apiKey,API_KEY);
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

module.exports = checkApiKey;
