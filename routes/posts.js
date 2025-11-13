const router = require("express").Router();
const multer = require("multer");
const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      text: req.body.text,
      image: req.file ? req.file.filename : null,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
