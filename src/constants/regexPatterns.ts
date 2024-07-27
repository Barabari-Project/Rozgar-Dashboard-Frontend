export const nameRegex = /^[a-zA-Z]{2,50}$/;
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex = /^.{4,16}$/;
export const pincodeRegex = /^\d{6}$/;
export const phoneRegex = /^\d{10}$/;
export const addressRegex = /^[a-zA-Z ]{2,50}$/;
export const string50CharRegex = /^[a-zA-Z0-9\s]{0,50}$/;
export const urlRegex = new RegExp(
  '^((https?:\\/\\/)?' + // Protocol
  '(([a-zA-Z0-9$-_@.&+!*"(),]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])\\.)*' + // Domain name and subdomains
  '[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,6})' + // Domain extension
  '(\\/.*)?$', // Path
  'i' // Case-insensitive flag
);