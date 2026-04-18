import { Router } from 'express';
import {
  contactUs,
  createTopEducator,
  deleteTopEducator,
  getTopEducators,
  getcontactUs,
  updateTopEducator,
  userStats,
} from '../controllers/miscellanous.controller.js';
import { isLoggedIn,authrizedRoll } from '../middlewares/userAuth.js';



const router = Router();

router.route('/contact')
.post(contactUs)
.get(getcontactUs);

router
  .route('/top-educators')
  .get(getTopEducators)
  .post(isLoggedIn, authrizedRoll('ADMIN'), createTopEducator);

router
  .route('/top-educators/:id')
  .put(isLoggedIn, authrizedRoll('ADMIN'), updateTopEducator)
  .delete(isLoggedIn, authrizedRoll('ADMIN'), deleteTopEducator);

router
  .route('/admin/stats/users')
  .get(isLoggedIn, authrizedRoll('ADMIN'), userStats);

export default router;
