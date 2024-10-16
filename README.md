# Business Card Management Application

## Overview
This application is designed for managing business card information, built using Angular for the frontend and C# with .NET Core for the backend. It allows users to create, view, delete, and import/export business cards while maintaining a clean and modern design.

## Features

### Frontend (Angular)
- **Add New Business Card**:
  - A user-friendly form for inputting business card details.
  - Drag-and-drop functionality and file upload options for importing XML, CSV files.
  - Preview of the business card before submission.

- **List Business Cards**:
  - A dedicated page that lists all stored business cards.
  - Options to delete or export business cards.

- **Optional Filtering**:
  - Filtering options to refine the displayed results based on criteria like name, date of birth, and gender.

### File Imports (XML/CSV)
- **File Handling in Backend**:
  - The backend is capable of parsing XML and CSV files for business card data.
  
- **Preview Before Submitting**:
  - Imported data is temporarily stored in the frontend for user review before making the API call to save it.

## Setup Instructions

### Prerequisites
- **Node.js** (version 14 or later)
- **Angular CLI** (installed globally)
- **.NET Core SDK** (version 7.0 or later)
- **SQL Server** (for database management)

