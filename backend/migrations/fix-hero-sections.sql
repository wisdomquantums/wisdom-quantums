-- Drop the old hero_sections table and let Sequelize recreate it
DROP TABLE IF EXISTS hero_sections;

-- Sequelize will automatically create the new table with correct structure
-- when the server starts with sync({ alter: true })
