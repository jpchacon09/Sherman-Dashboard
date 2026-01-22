#!/bin/sh

# Export environment variables for Vite
export VITE_GOOGLE_API_KEY="${VITE_GOOGLE_API_KEY}"
export VITE_SPREADSHEET_ID="${VITE_SPREADSHEET_ID}"
export VITE_SHEET_NAME="${VITE_SHEET_NAME:-Finance}"
export VITE_SHEET_RANGE="${VITE_SHEET_RANGE:-A:Z}"

echo "Building with environment variables:"
echo "VITE_GOOGLE_API_KEY: ${VITE_GOOGLE_API_KEY:0:10}..."
echo "VITE_SPREADSHEET_ID: ${VITE_SPREADSHEET_ID}"
echo "VITE_SHEET_NAME: ${VITE_SHEET_NAME}"
echo "VITE_SHEET_RANGE: ${VITE_SHEET_RANGE}"

# Run the build
npm run build
