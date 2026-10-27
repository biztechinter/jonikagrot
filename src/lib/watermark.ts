import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

/**
 * Dynamically stamps a translucent diagonal watermark and security footer
 * onto each page of a confidential PDF document before download.
 */
export async function watermarkPdf(
  pdfBuffer: Buffer,
  userEmail: string,
  ipAddress?: string
): Promise<Buffer> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
    const diagonalText = `CONFIDENTIAL · ${userEmail.toUpperCase()} · JONIK NDOVU FARM`;
    const footerText = `CONFIDENTIAL DILIGENCE COPY · LICENSED TO: ${userEmail} · ${timestamp} ${ipAddress ? `· IP: ${ipAddress}` : ""}`;

    for (const page of pages) {
      const { width, height } = page.getSize();

      // ── 1. Diagonal Watermark in Center ─────────────────────────────
      // Font size proportional to page dimensions
      const fontSize = Math.max(14, Math.min(24, Math.min(width, height) * 0.028));
      const textWidth = helveticaBold.widthOfTextAtSize(diagonalText, fontSize);

      page.drawText(diagonalText, {
        x: Math.max(20, width / 2 - textWidth / 2.8),
        y: height / 2 - 20,
        size: fontSize,
        font: helveticaBold,
        color: rgb(0.45, 0.45, 0.45),
        opacity: 0.14,
        rotate: degrees(42),
      });

      // ── 2. Header Security Strip ────────────────────────────────────
      const headerText = `JONIK NDOVU FARM AGRO-TOURISM · CONFIDENTIAL DATA ROOM · AUTHORISED ACCESS`;
      const headerFontSize = 6.5;
      const headerWidth = helvetica.widthOfTextAtSize(headerText, headerFontSize);
      page.drawText(headerText, {
        x: Math.max(15, (width - headerWidth) / 2),
        y: height - 16,
        size: headerFontSize,
        font: helvetica,
        color: rgb(0.35, 0.35, 0.35),
        opacity: 0.45,
      });

      // ── 3. Footer Audit & Attribution Strip ─────────────────────────
      const footerFontSize = 6.5;
      const footerWidth = helvetica.widthOfTextAtSize(footerText, footerFontSize);
      page.drawText(footerText, {
        x: Math.max(15, (width - footerWidth) / 2),
        y: 14,
        size: footerFontSize,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3),
        opacity: 0.5,
      });
    }

    const modifiedBytes = await pdfDoc.save();
    return Buffer.from(modifiedBytes);
  } catch (err) {
    console.warn("[Watermark] Failed to apply PDF watermark, returning original buffer:", err);
    // Graceful fallback to unwatermarked original so downloads never fail
    return pdfBuffer;
  }
}
