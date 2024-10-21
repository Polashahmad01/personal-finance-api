import express from "express";
const router = express.Router();

router.post("/v1/user", (req, res, next) => {
  res.status(200).json({ success: true });
});

export default router;
