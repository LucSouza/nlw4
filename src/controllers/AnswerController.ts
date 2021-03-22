import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerControler {

  // http://localhost:3333/answers/1?u=952dd379-8338-4777-9cb6-bf35948672ab
  /** * route params => Parametros que compoe a rota */
  async execute(request: Request, response: Response){
 
    const {value} = request.params;
    const { u } = request.query;
    
    const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });
    if(!surveyUser){
      return response.status(400).json({
        error: "Survey User does not exists!"
      })
    }
    surveyUser.value = Number(value);
  
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }

}

export {AnswerControler}