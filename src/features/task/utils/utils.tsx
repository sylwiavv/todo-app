export const generateUniqueId = () => {
  const now = new Date();
  const timePart = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  const datePart = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;
  const randomPart = Math.floor(Math.random() * 1000);

  return `${timePart}${datePart}${randomPart}`;
};
