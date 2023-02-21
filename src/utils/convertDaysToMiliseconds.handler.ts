const convertDaysInMiliseconds = (days: number): number => {
  const milisecondsPerDay = 24 * 60 * 60 * 1000
  const result = days * milisecondsPerDay
  return result
}

export { convertDaysInMiliseconds }
