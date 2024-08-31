export const wordLimit = (limit: number, text: string): string => {
  return text?.length > limit ? `${text.substring(0, limit)}...` : `${text}`;
};
