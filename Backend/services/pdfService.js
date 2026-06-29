import PDFDocument from "pdfkit";

/**
 * Generates a downloadable PDF file from legal petition draft text.
 * @param {string} petitionText - The legal petition draft text.
 * @param {object} res - Express response object.
 */
export const generatePetitionPDF = (petitionText, res) => {
    const doc = new PDFDocument({
        margin: 50,
        size: "A4",
    });

    // Set headers for downloadable PDF attachment
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=legal_petition.pdf");

    doc.pipe(res);

    // Decorative outer legal frame border
    doc.lineWidth(1);
    doc.rect(35, 35, doc.page.width - 70, doc.page.height - 70).stroke("#1e3a8a");

    // Header title
    doc.font("Helvetica-Bold")
       .fontSize(18)
       .fillColor("#1e3a8a")
       .text("LEGAL PETITION DRAFT", { align: "center" });
    
    doc.moveDown(0.3);

    // AI generated subtext
    doc.font("Helvetica-Oblique")
       .fontSize(10)
       .fillColor("#4b5563")
       .text("HAQMarg AI-Assisted Legal Drafting", { align: "center" });

    doc.moveDown(1.5);

    // Decorative separation bar
    doc.strokeColor("#cbd5e1")
       .moveTo(50, doc.y)
       .lineTo(doc.page.width - 50, doc.y)
       .stroke();

    doc.moveDown(1.5);

    // Reset layout color and font for main body content
    doc.font("Helvetica")
       .fontSize(11)
       .fillColor("#1f2937")
       .text(petitionText, {
           align: "justify",
           lineGap: 6,
           paragraphGap: 12
       });

    // End / Finalize the PDF stream
    doc.end();
};
