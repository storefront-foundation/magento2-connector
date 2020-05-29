const cartItemProductDefaultSchema = `
  name
  sku
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
