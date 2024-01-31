import { Router } from "express";
import upload from "../utils/multer";
import addNewQuiz from "../controllers/add-quiz";

const router = Router();

router.get("/add-quiz", (req, res, next) => {
  res.render("index");
  return;
});

router.post("/add-quiz", upload, addNewQuiz);

export default router;
