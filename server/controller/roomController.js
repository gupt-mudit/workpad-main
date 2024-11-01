import Room from '../models/Room.js'

export const getRoom = async (id) => {
    if (id === null) return;

    const document = await Room.findById(id);

    if(document) return document;

    return await Room.create({ _id: id, state: "" })
}

export const updateRoom = async (id, data) => {
    return await Room.findByIdAndUpdate(id, {state: data });
}