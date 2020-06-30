import GraphQlQuery from '../types/GraphQlQuery';

function getFullInnerSchema(menuItemFields, numberOfLevels): string {
  let fullInnerSchema = '';
  const menuItemFieldsJoined = menuItemFields
    .filter((itemField) => itemField !== 'children')
    .join('\n');
  const childrenEmptyObject = 'children {}';
  for (let i = 0; i < numberOfLevels; i++) {
    if (!fullInnerSchema.includes(childrenEmptyObject)) {
      fullInnerSchema += `${menuItemFieldsJoined}\n${childrenEmptyObject}`;
    } else {
      fullInnerSchema = fullInnerSchema.replace(childrenEmptyObject, `children { ${menuItemFieldsJoined}\n${childrenEmptyObject} }`);
    }
  }
  fullInnerSchema = fullInnerSchema.replace(childrenEmptyObject, '');
  return fullInnerSchema;
}

/**
 * Magento 2: menu Graph QL query
 */
const query = ({
  numberOfLevels = 2,
  menuItemFields = [
    'name',
    'url_path',
    'url_suffix',
    'position',
  ],
}): GraphQlQuery => {
  const fullInnerSchema = getFullInnerSchema(menuItemFields, numberOfLevels);
  return {
    query: `
      {
        categoryList(filters: {}) {
          level
          children {
            ${fullInnerSchema}
          }
        }
      }
    `,
  };
};

export default query;
