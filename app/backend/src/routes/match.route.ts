import express = require('express');
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import MatchService from '../database/services/match.service';
import MatchController from '../database/controllers/match.controller';

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);

const router = express.Router();

router.get('/', matchController.getAll);

export default router;
