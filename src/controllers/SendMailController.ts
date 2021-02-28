import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({
        erro: "User Does Not Exists",
      });
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return response.status(400).json({
        error: "Survey Does Not Exists!",
      });
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description : survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    }
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
      where: [{user_id: user.id},{value: null}],
      relations: ["user", "survey"],
    });

    if(surveyUserAlreadyExists){
      await SendMailService.execute(email, survey.title, variables, npsPath);

      return response.json(surveyUserAlreadyExists);

    }

    // Salvar as Informações na tabela SurveyUser
    const surveyUser = surveyUsersRepository.create({
      user_id: user.id,
      survey_id : survey_id
    })
    

    await surveyUsersRepository.save(surveyUser);
    // Enviar e-mail para o usuario
    
    await SendMailService.execute(email, survey.title,variables, npsPath)

    return response.json(surveyUser);
  }
}

export { SendMailController };
