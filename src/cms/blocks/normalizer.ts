import get from 'lodash/get';
import cheerio from 'cheerio';
import { host } from '../../config';

/**
 * Magento 2: cmsBlocks normalizer
 */
function normalizer(rawData): any {
  const items = get(rawData, 'data.cmsBlocks.items', []);
  return {
    items: items.map((item) => {
      const content = get(item, 'content', '');
      const $content = cheerio.load(content);
      $content('a[href]').each((i, elem) => {
        const $link = $content(elem);
        const rawHref = $link.attr('href');
        let newHref = rawHref.replace(host, '');

        // @TODO: find a better way to create RSF router links
        if (
          newHref.startsWith('/women')
          || newHref.startsWith('/men')
          || newHref.startsWith('/collections')
          || newHref.startsWith('/gear')
          || newHref.startsWith('/training')
          || newHref.startsWith('/sale')
        ) {
          newHref = `/s${newHref}`;
        } else {
          newHref = `/p/${newHref}`;
        }

        $link.attr('href', newHref);
      });
      return {
        ...item,
        content: $content.html(),
      };
    }),
  };
}

export default normalizer;
