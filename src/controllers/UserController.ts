import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome Obrigatorio"),
      email: yup.string().email().required("Email obrigatorio ou incorreto")
    })

    try {
      await schema.validate(request.body, {abortEarly: false})
    }catch(err){
      throw new AppError(err);
    }


    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email,
    });
    if (userAlreadyExists) {
      throw new AppError("User already Exists!")
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
  async show(request: Request, response: Response){
    const userRepository = getCustomRepository(UserRepository);
    const all = await userRepository.find();
    return response.json(all);
  }
}

export { UserController };
