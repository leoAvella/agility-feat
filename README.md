# Mortgage Underwriting System

A modern React/Next.js application for mortgage loan underwriting decisions. The system calculates Debt-to-Income (DTI) and Loan-to-Value (LTV) ratios to automatically determine loan eligibility based on configurable business rules.

## 🚀 Features

- **Loan Application Management**: Create and review mortgage applications
- **Automated Underwriting**: Real-time DTI and LTV calculations
- **Decision Engine**: Automated Approve/Refer/Decline decisions with reasoning
- **Responsive Design**: Mobile-first design with Flowbite React components
- **Bilingual Support**: English and Spanish language support
- **Real-time Validation**: Form validation with user-friendly error messages
- **Application History**: View past applications with detailed results

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ with React 18+
- **Styling**: Tailwind CSS with Flowbite React components
- **Database**: SQLite with Prisma ORM
- **Internationalization**: react-i18next
- **TypeScript**: Full type safety
- **Validation**: Zod schema validation

## 📋 Business Rules

The system evaluates applications based on:

### Approve Conditions:
- DTI ≤ 0.43 (43%)
- LTV ≤ 0.80 (80%)
- FICO Score ≥ 680

### Refer Conditions (Manual Review):
- DTI ≤ 0.50 (50%)
- LTV ≤ 0.95 (95%) 
- FICO Score ≥ 660

### Decline Conditions:
- Any criteria outside above ranges

## 🏗️ Project Structure
# Mortgage Underwriting System

A modern React/Next.js application for mortgage loan underwriting decisions. The system calculates Debt-to-Income (DTI) and Loan-to-Value (LTV) ratios to automatically determine loan eligibility based on configurable business rules.

## 🚀 Features

- **Loan Application Management**: Create and review mortgage applications
- **Automated Underwriting**: Real-time DTI and LTV calculations
- **Decision Engine**: Automated Approve/Refer/Decline decisions with reasoning
- **Responsive Design**: Mobile-first design with Flowbite React components
- **Bilingual Support**: English and Spanish language support
- **Real-time Validation**: Form validation with user-friendly error messages
- **Application History**: View past applications with detailed results
- **RESTful API**: Complete API for application management
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ with React 18+
- **Styling**: Tailwind CSS with Flowbite React components
- **Database**: SQLite with Prisma ORM
- **Internationalization**: react-i18next
- **Validation**: Zod schema validation
- **Language**: TypeScript
- **Build Tool**: Turbopack (optional)

## 📋 Business Rules

The system evaluates applications based on configurable thresholds:

### Approve Conditions:
- **DTI** ≤ 0.43 (43%)
- **LTV** ≤ 0.80 (80%) 
- **FICO Score** ≥ 680

### Refer Conditions (Manual Review):
- **DTI** ≤ 0.50 (50%)
- **LTV** ≤ 0.95 (95%)
- **FICO Score** ≥ 660

### Decline Conditions:
- Any criteria outside above ranges

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** 18.17 or later
- **npm** 9.0 or later
- **Git**

### example .en.local 

NEXT_PUBLIC_DTI_APPROVE=0.43
NEXT_PUBLIC_DTI_REFER=0.50
NEXT_PUBLIC_LTV_APPROVE=0.80
NEXT_PUBLIC_LTV_REFER=0.95
NEXT_PUBLIC_CREDIT_SCORE_APPROVE=680
NEXT_PUBLIC_CREDIT_SCORE_REFER=660



### Installation Steps

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd agility-feat

# Using npm
npm install

# Or using yarn
yarn install


# Generate Prisma client
npx prisma generate

# Run initial migration
npx prisma migrate dev --name init

# Optional: Seed database with sample data
npx prisma db seed

# Start development server
npm run dev