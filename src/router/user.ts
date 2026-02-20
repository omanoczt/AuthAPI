import { Router, Request, Response } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post('/', async (req: Request, res: Response)=>{
  const userController = new UserController(req, res);

  await userController.create();

  return;
});

router.get('{/:identifier}', async (req: Request, res: Response)=>{
  const userController = new UserController(req, res);

  await userController.get();

  return;
});

router.put('/:identifier', (req: Request, res: Response)=>{
  // Atualiza os dados de um usuário
})

router.delete('/:identifier', (req: Request, res: Response)=>{
  // Deleta um usuário
})

export default router;