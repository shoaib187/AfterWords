// import {MMKV} from 'react-native-mmkv';
import moment from 'moment';

export const formatTimeAgo = dateString => {
  return moment(dateString).fromNow();
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

// export const storage = new MMKV();
export const DATA = [
  {
    img: require('../../assets/images/img15.jpg'),
    id: 1,
    name: 'Gabriel Inferno',
    rating: 9,
    description:
      '24 hours in the lives of three young men in the French suburbs the day.',
  },
  {
    name: 'The Dark Knight',
    img: require('../../assets/images/img20.jpg'),
    id: 2,
    rating: 7.5,
    description:
      'The aging patriarch of an organized crime dynasty in postwar New York City.',
  },
  {
    name: 'Fight Club',
    rating: 8.5,
    description:
      'A bounty hunting scam joins two men in an uneasy alliance against a third. ',
    img: require('../../assets/images/img21.jpg'),
    id: 3,
  },
  {
    img: require('../../assets/images/img22.jpg'),
    id: 4,
    name: 'Batman Begins',
    rating: 5.8,
    description:
      'A former Roman General sets out to exact vengeance against the corrupt.',
  },
  {
    img: require('../../assets/images/img23.jpg'),
    id: 5,
    name: 'The God Father Part 02',
    rating: 4,
    description:
      'Los Angeles citizens with vastly separate lives collide in interweaving stories.',
  },
  {
    img: require('../../assets/images/img24.jpg'),
    id: 7,
    name: 'Man Bites Dog',
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require('../../assets/images/img25.jpg'),
    id: 8,
    name: 'The Departed',
    rating: 8.0,
    description:
      'n the deep south during the 1930s, three escaped convicts search for hidden treasure.',
  },
];

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
