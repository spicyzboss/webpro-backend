function isValidMd5(message) {
  return !!message.match(/^[a-f0-9]{32}$/);
}

export default isValidMd5;
