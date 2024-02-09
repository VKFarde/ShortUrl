const shortid = require("shortid");
const URL = require("../Model/productModel");

const productControl = {
  convertUrl: async (req, res) => {
    try {
      const user = req.user;
      const { val } = req.body;

      if (!val) return res.status(400).json({ msg: "url is required" });

      const shortID = shortid();
      const newUrl = new URL({
        user: user.userId,
        shortId: shortID,
        redirectURL: val,
        visitHistory: [],
      });

      await newUrl.save();

      res
        .status(200)
        .json({ msg: "successfully created Short Url", url: shortID });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create short URL" });
    }
  },

  allurls: async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      const data = await URL.find({
        user: user.userId,
      });
      console.log("ajdkjabskfjbkd", data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create short URL" });
    }
  },

  hVisits: async (req, res) => {
    try {
      const shortId = req.params.shortId;
      console.log(shortId);
      const url = await URL.findOne({ shortId });

      if (!url) {
        return res.status(404).json({ message: "Short URL not found" });
      }
      url.visitHistory.push({ timestamp: Date.now() });
      await url.save();
      console.log(url.redirectURL);
      res.redirect(url.redirectURL);
    } catch (error) {
      console.error("Error tracking visit:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = productControl;
