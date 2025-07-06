import express from "express";
import fetch from "node-fetch";
import { getProductList } from "../integration/config.js";
const analysis = express.Router();

analysis.post("/", async (req, res) => {
  try {

    const { text } = req.body;

    console.log(req.body);
    
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    let value = await getProductList(text);
    value = JSON.parse(value);
    const products = await getProductList(text);
    const productList = JSON.parse(products);

    const results = await Promise.all(
      productList.map(async (item) => {
        const response = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
            item.item
          )}&search_simple=1&json=1`
        );
        const data = await response.json();
        const firstProduct = data.products?.[0];
        const agribalyse = firstProduct?.ecoscore_data?.agribalyse;

        if (!agribalyse) {
          console.warn(`No agribalyse data for ${item.item}`);
          return {
            item: item.item,
            co2_total_kg: 0,
            message: "No carbon data found",
          };
        }

        const carbonPerKg = agribalyse.co2_total || 0;
        const quantity = item.quantity_value;
        const co2_total = carbonPerKg * quantity;

        return {
          item: item.item,
          category: agribalyse.name_en || "Unknown",
          co2_total_kg: Number(co2_total.toFixed(2)),
          co2_breakdown: {
            agriculture: agribalyse.co2_agriculture,
            processing: agribalyse.co2_processing,
            packaging: agribalyse.co2_packaging,
            transportation: agribalyse.co2_transportation,
            distribution: agribalyse.co2_distribution,
            consumption: agribalyse.co2_consumption,
          },
          source: "Open Food Facts Agribalyse v3.1.1",
        };
      })
    );

    console.log(results);
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error in analysis route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { analysis };
