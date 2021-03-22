import { Router} from "express";
import { AnswerControler } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysControllers } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysControllers();

const sendMailController = new SendMailController();
const answerController = new AnswerControler();
const npsController = new NpsController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute)

router.get("/answers/:value", answerController.execute)

router.get("/nps/:survey_id", npsController.execute)

export {router}