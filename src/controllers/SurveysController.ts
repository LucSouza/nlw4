import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import {Request, Response} from "express";

class SurveysControllers{
  async create(request: Request, response: Response){
    const {title, description} = request.body;

    const surveysRepository = getCustomRepository(SurveyRepository);

    const survey = surveysRepository.create({
    title,
    description
  });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }
  async show(request: Request, response: Response){
    const surveysRepository = getCustomRepository(SurveyRepository);
    const all = await surveysRepository.find();
    return response.json(all);
  }
}

export { SurveysControllers };
