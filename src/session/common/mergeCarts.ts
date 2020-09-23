import { fetchMergeCarts, normalizeMergeCarts } from '../../cart/common/mergeCarts';
import CartResponse from '../../types/CartResponse';

/**
 * Magento 2: common -> mergeCarts
 */
export default async function mergeCarts({ token, sourceCartId, destinationCartId }): Promise<CartResponse> {
  const rawData = await fetchMergeCarts(token, sourceCartId, destinationCartId);
  const data = normalizeMergeCarts(rawData);
  return {
    ...data,
  };
}
