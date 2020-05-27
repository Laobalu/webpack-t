const fs = require('fs');
const path = require('path')
function fromJSONFile(filename) {
  return (req, res) => {
    const dir = path.resolve(__dirname, `./data/${filename}.json`)
    const data = fs.readFileSync(dir).toString();
    const json = JSON.parse(data);
    return res.json(json);
  };
}
const toolApi = {
  'GET /api/v2/searchRecommendList': fromJSONFile('searchRecommendList'),
  'GET /web/api/submitFeedback': fromJSONFile('feedback'),
}
const proxy = {
  ...toolApi,
};
module.exports = proxy;
