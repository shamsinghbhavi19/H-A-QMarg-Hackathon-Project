export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        res.json({
            success: true,
            reply: `Received message: ${message || ""}`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
