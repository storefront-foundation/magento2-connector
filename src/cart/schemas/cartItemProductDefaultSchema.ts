const cartItemProductDefaultSchema = `
  name
  sku
  url_key
  url_suffix
  thumbnail { url }
  price_range {
    maximum_price {
      regular_price { value currency }
      final_price { value currency }
      discount { amount_off percent_off }
    }
  }
`;

export default cartItemProductDefaultSchema;
