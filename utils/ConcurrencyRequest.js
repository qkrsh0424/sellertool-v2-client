import pLimit from 'p-limit';

const ConcurrencyRequest = pLimit(1);

export default ConcurrencyRequest;