import { Router } from "express";
import { deleteEvent, editEvent, getEvents, postEvent } from "../controllers/eventsController";
import { schemaValidator } from "../middlewares/schemaValidation";
import { eventSchema } from "../schema&&types/eventSchema";

const router = Router()

router.get('/events', getEvents)
// router.get('/num_eventos/:mes', )  //agrupador
router.post('/new_event', schemaValidator(eventSchema), postEvent )
router.delete('/event:id', deleteEvent )
router.put('/event:id', schemaValidator(eventSchema), editEvent)

export default router