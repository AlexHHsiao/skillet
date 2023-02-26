export const BASE_URL = 'https://skillet-interview-express-rng3tbs6qq-wl.a.run.app';
export const getCollections = () =>  fetch(`${BASE_URL}/getCollections`);
export const getAssets = (address) =>  fetch(`${BASE_URL}/getCollectionAssets?collectionAddress=${address}`);