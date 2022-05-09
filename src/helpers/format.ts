import dayjs from 'dayjs';
import { EventCondition } from '@/models/list.model';

export const formatTime = (time: string) => {
  const date = new Date(+new Date(time) + 8 * 3600 * 1000);
  return date.toUTCString().slice(4, 17);
};

export const formatDetailDate = (time: string) => {
  const date = new Date(+new Date(time) + 8 * 3600 * 1000);
  return date.toUTCString().slice(4, 16);
};

function todayRange() {
  return [dayjs().startOf('date'), dayjs().endOf('date')];
}

function tomorrowRange() {
  return [
    dayjs().add(1, 'day').startOf('date'),
    dayjs().add(1, 'day').endOf('date'),
  ];
}

function thisWeekRange() {
  return [dayjs().startOf('week'), dayjs().endOf('week')];
}

function thisMonthRange() {
  return [dayjs().startOf('month'), dayjs().endOf('month')];
}

export const getTimeRange = (tag: string) => {
  const timeTagMap = [
    { tag: 'ANYTIME', range: [0, 0] },
    { tag: 'TODAY', range: todayRange() },
    { tag: 'TOMORROW', range: tomorrowRange() },
    { tag: 'THIS WEEK', range: thisWeekRange() },
    { tag: 'THIS MONTH', range: thisMonthRange() },
    { tag: 'LATER', range: [0, 0] },
  ];
  return timeTagMap.find((time) => time.tag === tag)?.range || [0, 0];
};
