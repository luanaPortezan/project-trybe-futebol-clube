import { Router } from 'express';
import Team from '../database/models/team.model';
import TeamService from '../database/services/team.service';
import TeamController from '../database/controllers/team.controller';

const teamRoutes = Router();
const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);

teamRoutes.get(
  '/',
  teamController.getAll,
);

teamRoutes.get(
  '/:id',
  teamController.getById,
);

export default teamRoutes;
