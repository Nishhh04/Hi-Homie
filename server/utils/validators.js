export const validatePropertyData = (data) => {
  const errors = [];

  if (!data.title) errors.push("Title is required");
  if (!data.price || isNaN(data.price) || Number(data.price) <= 0)
    errors.push("Price must be a number greater than 0");

  if (!data.location || !data.location.address || !data.location.city || !data.location.state || !data.location.country)
    errors.push("Complete location (address, city, state, country) is required");

  if (!["buy", "rent", "sell"].includes(data.type))
    errors.push("Type must be one of: buy, rent, sell");

  if (!data.bedrooms || Number(data.bedrooms) <= 0)
    errors.push("Bedrooms must be at least 1");

  if (!data.bathrooms || Number(data.bathrooms) <= 0)
    errors.push("Bathrooms must be at least 1");

  // Contact info
  if (!data.contact || !data.contact.name)
    errors.push("Owner name is required");
  if (!data.contact.email || !/\S+@\S+\.\S+/.test(data.contact.email))
    errors.push("Valid owner email is required");
  if (!data.contact.phone || !/^\d{7,15}$/.test(data.contact.phone))
    errors.push("Owner phone must be 7-15 digits");

  return errors;
};
