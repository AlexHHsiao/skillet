export const ipfsHelper = (url) => {
    if (url.startsWith('ipfs')) {
        return `https://ipfs.io/ipfs/${url.split('//')[1]}`;
    } else {
        return url;
    }
};

export const twitterHelper = (username) => `https://twitter.com/${username}`
