import express from 'express';
import { getEventById, getRecentEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/events/:id', getEventById);
router.get('/events', getRecentEvents);
router.post('/events', upload.single('image'), createEvent);
router.put('/events/:id', upload.single('image'), updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;