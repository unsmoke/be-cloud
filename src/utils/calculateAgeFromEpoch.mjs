export const calculateAgeFromEpoch = (epoch) => {
  // Convert epoch to Date object
  const birthDate = new Date(epoch * 1000); // Convert seconds to milliseconds
  const currentDate = new Date();

  // Calculate age
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  // Adjust age if current month/day is before the birth month/day
  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};