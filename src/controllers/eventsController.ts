import { Request, Response } from "express";
import { database } from "../database/postgress";
import { eventType } from "../schema&&types/eventType";

export async function postEvent (req : Request, res: Response){
    const event : eventType = req.body
    try {
        await database.query(
            `INSERT INTO events (title, date)
             VALUES ($1,$2)
            `, [ event.title, event.date ] )
        return res.send('new Event Inserted')

    } catch (error) {
        console.log('error postEvent: ', error)
        return res.sendStatus(500)
    }
}

export async function getEvents (req : Request, res: Response){
    try {
        const { rows: eventList } = await database.query(
            `SELECT * FROM events `)

        return res.status(200).send(eventList)
        
    } catch (error) {
        console.log('error postEvent: ', error)
        return res.sendStatus(500)
    }
} 

export async function getEvent (req : Request, res: Response){
    const id: number = +req.params.id

    try {
        if(!verifyExistence(id)) throw{ type: 'not found'}

        const { rows: eventList } = await database.query(
            `SELECT * FROM events
             WHERE events.id = $1
             `, [id])

        return res.status(200).send(eventList)
        
    } catch (error) {
        console.log('error postEvent: ', error)
        return res.sendStatus(500)
    }
} 


export async function editEvent (req : Request, res: Response){
    const id: number = +req.params.id
    const event : eventType = req.body

    try {
        if(!verifyExistence(id)) throw{ type: 'not found'}

        await database.query(
            `UPDATE events
             SET title = $1, date = $2
             WHERE events.id = $3;
            `, [event.title, event.date, id] )

        return res.status(200).send('Event was edited')
        
    } catch (error) {
        if(error.type === 'not found'){
            return res.sendStatus(404)
        }

        console.log('error postEvent: ', error)
        return res.sendStatus(500)
    }
} 

export async function deleteEvent (req : Request, res: Response){
    const id: number = +req.params.id
    
    console.log('ID: ', id)
    try {
        const verify : boolean = await verifyExistence(id)
        if( !verify ) throw{ type: 'not found'}

        await database.query(
            `DELETE FROM events
             WHERE events.id = $1;
            `, [ id ] )

        return res.status(200).send('Event was deleted')
        
    } catch (error) {
        if(error.type === 'not found'){
            return res.sendStatus(404)
        }

        console.log('error postEvent: ', error)
        return res.sendStatus(500)
    }
} 

async function verifyExistence (id: number) : Promise<boolean> {
    const {rows: event} = await database.query(
        `   SELECT * FROM events
            WHERE events.id = $1
        `, [id] )

    if(event.length > 0){
        return true
    }
    return false 
}