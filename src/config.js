export const host = process.env.M2_CONFIG_HOST;
console.log('__ : host', host);
export const graphQlHost = `${host}/graphql`;
