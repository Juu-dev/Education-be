export const myNanoid = async (length = 21) => {
  const { customAlphabet } = await import('nanoid');
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const id = customAlphabet(alphabet, length)();

  return id;
};
