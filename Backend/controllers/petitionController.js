import { generatePetition } from "../services/geminiService.js";
import { generatePetitionPDF } from "../services/pdfService.js";

const handleGeneratePetition = async (req, res) => {
    try {
        const { name, district, caseType, description, language } = req.body;

        // Basic validation
        if (!description) {
            return res.status(400).json({
                success: false,
                error: "Case description is required to generate a legal petition."
            });
        }

        const draft = await generatePetition({
            name,
            district,
            caseType,
            description,
            language
        });

        res.json({
            success: true,
            petition: draft,
            meta: {
                name: name || "Not Specified",
                district: district || "Not Specified",
                caseType: caseType || "Not Specified",
                language: language || "English"
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const handleDownloadPetition = async (req, res) => {
    try {
        const { text, name, district, caseType, description, language } = req.query;

        let petitionText = text;

        // If direct petition text is not provided, generate it dynamically from parameters
        if (!petitionText) {
            if (!description) {
                return res.status(400).json({
                    success: false,
                    error: "Please provide either a 'text' query parameter or at least a case 'description' to generate and download the PDF."
                });
            }

            petitionText = await generatePetition({
                name,
                district,
                caseType,
                description,
                language
            });
        }

        generatePetitionPDF(petitionText, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export { handleGeneratePetition, handleDownloadPetition };
