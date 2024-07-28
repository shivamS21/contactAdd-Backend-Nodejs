import express from 'express';
const router = express.Router();
import contactController from '../controllers/contactController.js';
import { validateToken } from '../middleware/validateTokenHandler.js';

const { getContact, getContactForId, createContact, updateContactId, deleteContactId } = contactController;

// Since contact routes are private routes, verification is needed in order to access them
router.use(validateToken);
// now all the routes in this Route file are validated.

router.route('/')
.get(getContact)
.post(createContact);

router.route('/:id')
.get(getContactForId)
.put(updateContactId)
.delete(deleteContactId);


export default router;