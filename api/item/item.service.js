const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy);
        const collection = await dbService.getCollection('item');
        const sortOptions = { created_at: -1 };
        
        const items = await collection.find(criteria).sort(sortOptions).toArray();
        return items;
    } catch (err) {
        logger.error('cannot find items', err);
        throw err;
    }
}
 
async function getById(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        const item = collection.findOne({ _id: ObjectId(itemId) })
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function remove(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.deleteOne({ _id: ObjectId(itemId) })
        return itemId
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function add(item) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.insertOne(item)
        return item
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

async function update(item) {
    try {
        const itemToSave = {
            category: item.category,
            mediaUrl: item.mediaUrl
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ _id: ObjectId(item._id) }, { $set: itemToSave })
        return item
    } catch (err) {
        logger.error(`cannot update item ${itemId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy = {  category: null}) {
    const {  category } = filterBy

    const criteria = {}

    if (category) {
        criteria.category = { $in: [category] };
    }

    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
