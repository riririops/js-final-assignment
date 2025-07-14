import dayjs from 'dayjs';

export const formatToday = () => dayjs().format('YYYY-MM-DD');

export const getPastDates = (n) =>
  Array.from({ length: n }).map((_, i) =>
    dayjs().subtract(n - 1 - i, 'day').format('YYYY-MM-DD')
  );