const TASK_STATUS = {
  BACK_LOCK: 'backlock',
  DOING: 'doing',
  DONE: 'done',
  CLOSE: 'task',
};

export const COLOR_BY_STATUS = {
  [TASK_STATUS.BACK_LOCK]: '#FAAD14',
  [TASK_STATUS.DOING]: '#1677ff',
  [TASK_STATUS.DONE]: '#52C43D',
  [TASK_STATUS.CLOSE]: '#000000a6',
};

export const getColorCategory = (type) => {
  switch (type) {
    case 'Q&A':
      return 'green';
    case 'Development':
      return 'orange';
    case 'Design':
      return 'red';
    case 'Business Analyst':
      return 'blue';
    case 'Test':
      return 'yellow';
    default:
      return 'green'; // This will use the default color of the Tag component
  }
};

export default TASK_STATUS;
