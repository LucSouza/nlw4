import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUsers";

@EntityRepository(SurveyUser)
class SurveyUsersRepository extends Repository<SurveyUser>{


}

export {SurveyUsersRepository}