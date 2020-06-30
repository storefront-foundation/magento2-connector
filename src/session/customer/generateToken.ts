import { fetchGenerateToken, normalizeGenerateToken } from '../../cart/customer/generateToken';

/**
 * Magento 2: customer -> generateToken
 */
export default async function generateToken({ email, password }): Promise<any> {
  const rawData = await fetchGenerateToken(email, password);
  const data = normalizeGenerateToken(rawData);
  return {
    ...data,
  };
}
