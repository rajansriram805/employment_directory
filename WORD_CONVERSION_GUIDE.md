# How to Convert Markdown to Word/PDF

## Method 1: Using Pandoc (Recommended)

### Install Pandoc
1. Download from: https://pandoc.org/installing.html
2. Install on your computer

### Convert to Word
```bash
# Project Report
pandoc PROJECT_REPORT_FOR_WORD.md -o PROJECT_REPORT.docx

# API Documentation
pandoc API_DOCUMENTATION_FOR_WORD.md -o API_DOCUMENTATION.docx
```

### Convert to PDF
```bash
# Project Report
pandoc PROJECT_REPORT_FOR_WORD.md -o PROJECT_REPORT.pdf

# API Documentation
pandoc API_DOCUMENTATION_FOR_WORD.md -o API_DOCUMENTATION.pdf
```

---

## Method 2: Copy-Paste to Microsoft Word

1. **Open** `PROJECT_REPORT_FOR_WORD.md` in any text editor
2. **Select All** (Ctrl+A) and **Copy** (Ctrl+C)
3. **Open Microsoft Word**
4. **Paste** (Ctrl+V)
5. **Format the document:**
   - Apply heading styles (Heading 1, Heading 2, etc.)
   - Adjust fonts and spacing
   - Add page numbers
   - Add table of contents (References → Table of Contents)
6. **Save as:** `PROJECT_REPORT.docx`
7. **Export as PDF:** File → Export → Create PDF

---

## Method 3: Online Converters

### Option A: Dillinger.io
1. Go to https://dillinger.io
2. Copy content from `.md` file
3. Paste into editor
4. Click "Export as" → "Styled HTML" or "PDF"

### Option B: Markdown to Word
1. Go to https://www.markdowntoword.com
2. Upload `.md` file or paste content
3. Download Word document

### Option C: CloudConvert
1. Go to https://cloudconvert.com/md-to-docx
2. Upload `.md` file
3. Convert to DOCX
4. Download and open in Word

---

## Method 4: VS Code Extension

1. Install "Markdown PDF" extension in VS Code
2. Open `.md` file
3. Right-click → "Markdown PDF: Export (pdf)"
4. Document will be exported as PDF

---

## Formatting Tips for Word

### 1. Table of Contents
- Place cursor where you want TOC
- References → Table of Contents → Automatic Table 1

### 2. Page Numbers
- Insert → Page Number → Bottom of Page

### 3. Headers/Footers
- Insert → Header & Footer
- Add title, date, page numbers

### 4. Code Blocks
- Highlight code
- Change font to "Courier New" or "Consolas"
- Add background color (gray)

### 5. Tables
- Word will auto-format markdown tables
- Adjust table styles as needed

### 6. Images/Screenshots
- Insert → Pictures
- Add screenshots from `screenshots/` folder
- Resize and position as needed

---

## Recommended Document Settings

### Page Setup
- **Margins:** 1 inch (2.54 cm) all sides
- **Size:** A4 or Letter
- **Orientation:** Portrait

### Fonts
- **Body:** Times New Roman, 12pt
- **Headings:** Times New Roman or Arial, Bold
- **Code:** Courier New, 10pt

### Spacing
- **Line Spacing:** 1.5 or Double
- **Paragraph Spacing:** 6pt after paragraphs

### Styles
- **Heading 1:** 18pt, Bold, Center
- **Heading 2:** 16pt, Bold
- **Heading 3:** 14pt, Bold

---

## Final Checklist

Before converting to PDF:

- [ ] All headings formatted correctly
- [ ] Table of contents generated
- [ ] Page numbers added
- [ ] Headers/Footers set
- [ ] Code blocks formatted properly
- [ ] Tables readable
- [ ] Images/screenshots inserted
- [ ] Consistent fonts and spacing
- [ ] Proofread for errors
- [ ] Student information filled in
- [ ] References formatted correctly

---

## Quick Steps Summary

1. Open markdown file
2. Copy all content
3. Paste into Microsoft Word
4. Format headings (Home → Styles)
5. Insert table of contents
6. Add page numbers
7. Insert screenshots (if any)
8. Save as DOCX
9. Export as PDF (File → Export → PDF)

---

**Note:** The markdown files are already formatted for easy conversion. Just follow any of the methods above!

