import 'react-native-url-polyfill/auto';
import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6aca677b001eb5ef1d0e') // Your Project ID
  .setPlatform('dev.netninja.shelfie');   // Your Appwrite platform ID

export const account = new Account(client);
export const databases = new Databases(client);

// Exporting client and ID for use across your application components and contexts
export { client, ID };

// Test Registration Function
export async function createUser(email: string, password: string, name?: string) {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    console.log('User created successfully:', response);
    // Automatically log in after sign up if desired
    await loginUser(email, password);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Test Login Function
export async function loginUser(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Logged in successfully:', session);
    return session;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Check Current User Session
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.log('No active session:', error);
    return null;
  }
}