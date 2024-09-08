const express = require('express');
const db = require('./db/connection');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const result = await db.raw('SELECT 1+1 AS result');
  res.send({ result: result.rows[0].result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const fetchEntities = async (words) => {
    const cityQueries = words.map(word => `SELECT 'city' AS type, id, name FROM cities WHERE name ILIKE ?`).join(' UNION ALL ');
    const brandQueries = words.map(word => `SELECT 'brand' AS type, id, name FROM brands WHERE name ILIKE ?`).join(' UNION ALL ');
    const dishTypeQueries = words.map(word => `SELECT 'dish_type' AS type, id, name FROM dish_types WHERE name ILIKE ?`).join(' UNION ALL ');
    const dietQueries = words.map(word => `SELECT 'diet' AS type, id, name FROM diets WHERE name ILIKE ?`).join(' UNION ALL ');

    const query = `${cityQueries} UNION ALL ${brandQueries} UNION ALL ${dishTypeQueries} UNION ALL ${dietQueries}`;

    const params = words.flatMap(word => Array(4).fill(`%${word}%`));
    const results = await db.raw(query, params);

    return results.rows;
};

const extractEntities = async (searchTerm) => {
    const words = searchTerm.split(/\s+/);

    const results = await fetchEntities(words);

    console.log(results);

    const entitiesMap = {
        city: [],
        brand: [],
        dish_type: [],
        diet: []
    };

    results.forEach(row => {
        entitiesMap[`${row.type}`].push({ id: row.id, name: row.name });
    });

    const combinations = [];
    
    const generateCombinations = (current, index) => {
        if (index >= words.length) {
            if (Object.keys(current).length > 0) {
                combinations.push(current);
            }
            return;
        }

        const word = words[index];
        const entityTypes = ['city', 'brand', 'dish_type', 'diet'];

        entityTypes.forEach(type => {
            entitiesMap[`${type}`].forEach(entity => {
                generateCombinations({ ...current, [type]: entity }, index + 1);
            });
        });

        generateCombinations(current, index + 1);
    };

    generateCombinations({}, 0);

    return combinations;
};


app.get('/test?', async (req, res) => {
    const searchTerm = req.query.term || 'New York Nike vegan';
    const results = await extractEntities(searchTerm);
    res.send({ results });
});