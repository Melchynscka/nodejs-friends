
const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
  if (!isString) return;

    const isContactType = (type) => ["work", "home", "personal"].includes(type);
    if (isContactType(contactType)) return contactType;
}

export const parseFilterParams = (query) => {
  const { contactType } = query;
    const parsedContactType = parseContactType(contactType);
  return {
    contactType: parsedContactType,
  };
    
};