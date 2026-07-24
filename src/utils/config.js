import moment from 'moment';

export const formatTimeAgo = dateString => {
  return moment(dateString).fromNow();
};

export const formatDate = (isoString, options = {}) => {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatDateTime = dateTime => {
  const now = moment();
  const date = moment(dateTime);

  // If it was sent today, show time: 04:42 PM
  if (now.isSame(date, 'day')) {
    return date.format('hh:mm A');
  }

  // If it was sent yesterday: Yesterday
  if (now.subtract(1, 'day').isSame(date, 'day')) {
    return 'Yesterday';
  }

  // If it was sent within the last 7 days: 3 days ago
  if (now.diff(date, 'days') < 7) {
    return date.fromNow();
  }

  // Otherwise, show the actual date: Feb 13, 2026
  return date.format('MMM DD, YYYY');
};

export const calculateAge = dob => {
  if (!dob) return null;

  const birthDate = new Date(dob);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  // adjust if birthday hasn't happened yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
