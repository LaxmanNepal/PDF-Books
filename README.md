# Laxman PDF Books

A GitHub Pages digital library for PDF books.

## Features

- Automatically discovers every `.pdf` in the repository.
- Generates `books.json` after PDF uploads.
- Responsive glass-style library UI.
- Browser PDF reader powered by PDF.js.
- Page navigation and reading progress.
- **AI Read Mode**: extracts selectable PDF text in the browser and reads the book continuously with the device's speech engine.
- No server is required for the reader or read-aloud feature.
- GitHub Pages deployment is automatic.

## Add a book

Put a PDF anywhere in the repository, preferably under a category such as:

`Novels/Nepali/My-Book.pdf`

Push to `main`. GitHub Actions will rebuild the catalog automatically and redeploy the library.

## AI Read Mode limitation

The first version intentionally avoids storing book text or sending PDFs to a third-party AI service. It uses the browser's speech synthesis engine, so available voices depend on the reader's device/browser. A later phase can add optional LLM summaries, chapter explanations, Q&A and higher-quality neural narration through a configured API.
