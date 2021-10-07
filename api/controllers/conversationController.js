// handle HTTP request
const axios = require("axios");

const createInitConversation = async (req, res) => {
  const userInfo = req.body;
  
  try {
    const response = await axios.post(
      "https://emely-chat-service-api-staging-ef5bmjer3q-ey.a.run.app/init",
      {
        ...userInfo,
      },
      { timeout: 1000 }
    );
    // send server response to client
    // console.log(response.data);
    res.status(200).json({ ...response.data });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ ...err });
  }
};


module.exports = {
  createInitConversation,
};
