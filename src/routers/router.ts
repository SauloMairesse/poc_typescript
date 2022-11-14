import { Router } from "express";
import { deleteEvent, editEvent, getEvent, getEvents, postEvent } from "../controllers/eventsController";
import { schemaValidator } from "../middlewares/schemaValidation";
import { eventSchema } from "../schema&&types/eventSchema";

const router = Router()

router.post('/events', schemaValidator(eventSchema), postEvent )
router.get('/events', getEvents)
router.get('/event/:id', getEvent)
router.put('/event/:id', schemaValidator(eventSchema), editEvent)
router.delete('/event/:id', deleteEvent )
// router.get('/num_eventos/:mes', )  //agrupador

export default router