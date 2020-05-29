import get from 'lodash/get';
import { fetchMergeCarts, normalizeMergeCarts } from '../../../../cart/common/mergeCarts';

/**
 * Magento 2: common mergeCarts handler
 */
export default async function mergeCarts(req, res) {
  const token = get(req, 'query.token');
  const sourceCartId = get(req, 'query.sourceCartId');
  const destinationCartId = get(req, 'query.destinationCartId');
  const rawData = await fetchMergeCarts(token, sourceCartId, destinationCartId);
  const data = normalizeMergeCarts(rawData);
  return res.json({
    ...data,
  });
}
