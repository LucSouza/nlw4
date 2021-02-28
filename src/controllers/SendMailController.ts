import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

    const userAlreadyExist = await userRepository.findOne({ email });

    if (!userAlreadyExist) {
      return response.status(400).json({
        erro: "User Does Not Exists",
      });
    }

    const surveyAlreadyExists = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!surveyAlreadyExists) {
      return response.status(400).json({
        error: "Survey Does Not Exists!",
      });
    }

    // Salvar as Informações na tabela SurveyUser
    const surveyUser = surveyUsersRepository.create({
      user_id: userAlreadyExist.id,
      survey_id : survey_id
    })
    
    await surveyUsersRepository.save(surveyUser);
    // Enviar e-mail para o usuario

    return response.json(surveyUser);
  }
}

export { SendMailController };
