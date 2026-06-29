import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJSON = (relativePath) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, relativePath), "utf-8"));
};

const ngos = loadJSON("../data/ngos.json");
const helplines = loadJSON("../data/helplines.json");
const faqs = loadJSON("../data/faqs.json");

/**
 * GET /api/resources/ngos
 * Supports optional query filters: category, region, search
 */
export const getNGOs = async (req, res) => {
    try {
        const { category, region, search } = req.query;
        let filteredNgos = [...ngos];

        if (category) {
            filteredNgos = filteredNgos.filter(n => 
                n.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        if (region) {
            filteredNgos = filteredNgos.filter(n => 
                n.region.toLowerCase().includes(region.toLowerCase())
            );
        }

        if (search) {
            const query = search.toLowerCase();
            filteredNgos = filteredNgos.filter(n => 
                n.name.toLowerCase().includes(query) ||
                n.description.toLowerCase().includes(query) ||
                n.category.toLowerCase().includes(query)
            );
        }

        res.json({
            success: true,
            count: filteredNgos.length,
            data: filteredNgos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * GET /api/resources/helplines
 * Supports optional query filters: category, search
 */
export const getHelplines = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filteredHelplines = [...helplines];

        if (category) {
            filteredHelplines = filteredHelplines.filter(h => 
                h.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        if (search) {
            const query = search.toLowerCase();
            filteredHelplines = filteredHelplines.filter(h => 
                h.name.toLowerCase().includes(query) ||
                h.description.toLowerCase().includes(query) ||
                h.category.toLowerCase().includes(query) ||
                h.number.includes(query)
            );
        }

        res.json({
            success: true,
            count: filteredHelplines.length,
            data: filteredHelplines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * GET /api/resources/faqs
 * Supports optional query filters: category, search
 */
export const getFAQs = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filteredFaqs = [...faqs];

        if (category) {
            filteredFaqs = filteredFaqs.filter(f => 
                f.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        if (search) {
            const query = search.toLowerCase();
            filteredFaqs = filteredFaqs.filter(f => 
                f.question.toLowerCase().includes(query) ||
                f.answer.toLowerCase().includes(query) ||
                f.category.toLowerCase().includes(query)
            );
        }

        res.json({
            success: true,
            count: filteredFaqs.length,
            data: filteredFaqs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
