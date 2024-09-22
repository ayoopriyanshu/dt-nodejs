import { getDb } from '../db/connectToDb.js';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';

export const getEventById = async (req, res) => {
    try {
        const eventId = new ObjectId(req.params.id);
        const event = await getDb().collection('events').findOne({ _id: eventId });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getRecentEvents = async (req, res) => {
    const { limit, page } = req.query;
    try {
        const events = await getDb()
            .collection('events')
            .find({})
            .sort({ schedule: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .toArray();
        res.json(events);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
};

export const createEvent = async (req, res) => {
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const image = req.file;
    const attendees = [];
    try {
        const result = await getDb().collection('events').insertOne({
            name,
            tagline,
            schedule: new Date(schedule),
            description,
            image,
            moderator,
            category,
            sub_category,
            rigor_rank: Number(rigor_rank),
            attendees,
        });
        res.json({ id: result.insertedId });
    } catch (error) {
        res.status(500).send('Error creating event');
    }
};

// export const updateEvent = async (req, res) => {
//     const { id } = req.params;
//     const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
//     const image = req.file;
//     try {
//         const result = await getDb().collection('events').updateOne(
//             { _id: ObjectId(id) },
//             {
//                 $set: {
//                     name,
//                     tagline,
//                     schedule: new Date(schedule),
//                     description,
//                     image,
//                     moderator,
//                     category,
//                     sub_category,
//                     rigor_rank: Number(rigor_rank),
//                 },
//             }
//         );
//         res.json(result);
//     } catch (error) {
//         res.status(500).send('Error updating event');
//     }
// };

export const updateEvent = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
        const image = req.file;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (tagline) updateFields.tagline = tagline;
        if (schedule) updateFields.schedule = new Date(schedule);
        if (description) updateFields.description = description;
        if (moderator) updateFields.moderator = moderator;
        if (category) updateFields.category = category;
        if (sub_category) updateFields.sub_category = sub_category;
        if (rigor_rank) updateFields.rigor_rank = Number(rigor_rank);
        if (image) updateFields.image = image;
        const result = await getDb().collection('events').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating event');
    }
};


export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getDb().collection('events').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.send('Event deleted');
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting event');
    }
};
