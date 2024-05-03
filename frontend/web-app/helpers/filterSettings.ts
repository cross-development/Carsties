import { GiFinishLine, GiFlame } from 'react-icons/gi';
import { BsFillStopBtnFill, BsStopwatchFill } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';

export const pageSizeButtons = [4, 8, 12];

export const orderButtons = [
  {
    label: 'Alphabetical',
    icon: AiOutlineSortAscending,
    value: 'make',
  },
  {
    label: 'End date',
    icon: AiOutlineClockCircle,
    value: 'endingSoon',
  },
  {
    label: 'Recently added',
    icon: BsFillStopBtnFill,
    value: 'new',
  },
];

export const filterButtons = [
  {
    label: 'Live Auctions',
    icon: GiFlame,
    value: 'live',
  },
  {
    label: 'Ending less then 6 hours',
    icon: GiFinishLine,
    value: 'endingSoon',
  },
  {
    label: 'Completed',
    icon: BsStopwatchFill,
    value: 'finished',
  },
];
