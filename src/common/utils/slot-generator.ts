export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  duration: number,
): string[] => {
  const slots: string[] = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let current = new Date();

  current.setHours(startH, startM, 0);

  const end = new Date();
  end.setHours(endH, endM, 0);

  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5));
    current = new Date(current.getTime() + duration * 60000);
  }

  return slots;
};
