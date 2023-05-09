import express = require('express');
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import MatchService from '../database/services/match.service';
import MatchController from '../database/controllers/match.controller';
import AuthToken from '../middlewares/auth.middleware';
import CheckUpdateMatchFields from '../middlewares/updateMatch.middleware';
import NewMatchValidate from '../middlewares/newMatch.middleware';

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);
const authentication = new AuthToken();
const checkUpdateMatchFields = new CheckUpdateMatchFields();
const newMatchValidate = new NewMatchValidate();

const router = express.Router();

router.get(
  '/',
  matchController.getAll,
);
router.patch(
  '/:id/finish',
  authentication.checkValidToken,
  matchController.finishMatch,
);
router.patch(
  '/:id',
  authentication.checkValidToken,
  checkUpdateMatchFields.checkFields,
  matchController.updateMathGoals,
);
router.post(
  '/',
  authentication.checkValidToken,
  newMatchValidate.checkValid,
  matchController.insertNewMatch,
);

export default router;
