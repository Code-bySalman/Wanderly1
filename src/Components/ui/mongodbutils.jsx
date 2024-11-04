// mongoUtils.js
import { MongoClient } from 'mongodb';

// Replace <username>, <password>, and <your-cluster-url> with your MongoDB credentials
const uri = 'mongodb+srv://bornin2002salman7:kwy1uxCBvbnGwd72@cluster0.pmzlw.mongodb.net/';
const client = new MongoClient(uri);

async function storeTripData(tripData) {
  try {
    await client.connect();
    const database = client.db('TripPlanner');
    const collection = database.collection('trips');
    const result = await collection.insertOne(tripData);
    console.log(`Trip data stored with id: ${result.insertedId}`);
    return result.insertedId; // Return the ID of the new document
  } catch (error) {
    console.error('Error storing trip data:', error);
  } finally {
    await client.close();
  }
}

async function retrieveTripData(docId) {
  try {
    await client.connect();
    const database = client.db('TripPlanner');
    const collection = database.collection('trips');
    const tripData = await collection.findOne({ _id: new MongoClient.ObjectID(docId) });
    return tripData; // Return the trip data
  } catch (error) {
    console.error('Error retrieving trip data:', error);
  } finally {
    await client.close();
  }
}

export { storeTripData, retrieveTripData };
