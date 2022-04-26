import { randomBytes } from 'crypto';

/** @type {String} */
const generateToken = () => randomBytes(16).toString('hex');

export default generateToken;
