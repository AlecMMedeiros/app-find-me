// Move to AWS ?
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

async function fetchProducts(searchTerm, category) {
    const url = `https://www.buscape.com.br/search?q=${encodeURIComponent(searchTerm)}&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=${category}&isDealsPage=false`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        return $("div[data-testid='product-card']").map((index, element) => {
            return {
                photo: $(element).find("img").attr("src"),
                description: $(element).find("h2[data-testid='product-card::name']").text(),
                price: $(element).find("p[data-testid='product-card::price']").text(),
                category: "",
                website: "Buscapé",
            };
        }).get();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

app.get("/api/search", async (req, res) => {
    const { searchTerm, category } = req.query;
    const products = await fetchProducts(searchTerm, category);
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

