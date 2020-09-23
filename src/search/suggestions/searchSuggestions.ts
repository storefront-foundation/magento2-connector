import SearchSuggestions from 'react-storefront-connector/SearchSuggestions';

/**
 * @TODO: implement
 */
function searchSuggestions(/* params, req, res */): Promise<SearchSuggestions> {
  return Promise.resolve({
    text: '',
    groups: [],
  });
}

export default searchSuggestions;
