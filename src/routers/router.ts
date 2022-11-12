import { Router } from "express";
import { deleteEvent, editEvent, getEvents, postEvent } from "../controllers/eventsController";

const router = Router()

router.get('/eventos', getEvents)
// router.get('/num_eventos/:mes', )  //agrupador
router.post('/new_evento', postEvent )
router.delete('/evento:id', deleteEvent )
router.put('/evento:id', editEvent)

export default router