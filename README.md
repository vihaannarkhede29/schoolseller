# SchoolSeller - Student Marketplace App

A web application for students to buy, sell, and reserve items like snacks, school supplies, and small products at school. The app is cash-based (no online payments) and allows sellers to track inventory, sales, and pending orders.

## Features

### User Roles
- **Seller**: Can list items, update inventory, see sales, view reservations, confirm or deny orders
- **Buyer**: Can browse items, reserve items, view pending orders, and optionally message sellers
- **Admin**: Can remove inappropriate listings and view basic analytics

### Key Features
- **Seller Dashboard**: Inventory management, sales tracking, order approval system
- **Buyer Dashboard**: Item browsing, reservation system, order tracking
- **Order Management**: Optional approval system for orders
- **Social Sharing**: Sellers can share their store links and post to social media
- **Responsive Design**: Works on desktop and mobile devices
- **Firebase Integration**: Real-time data with Google Authentication

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vihaannarkhede29/schoolseller.git
   cd schoolseller
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication (Google provider)
   - Enable Firestore Database
   - Update `src/firebase.js` with your config

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`

## Tech Stack

- **React 18** - Frontend framework
- **Firebase** - Authentication and database
- **Chart.js** - Analytics and charts
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Usage

### For Sellers
1. Sign in with Google
2. Choose "I'm a Seller" role
3. Add items to your inventory
4. Manage incoming reservations and orders
5. Share your store link on social media
6. Track sales and analytics

### For Buyers
1. Sign in with Google
2. Choose "I'm a Buyer" role
3. Browse available items
4. Reserve items you want to purchase
5. Track your order status
6. Complete transactions in person with cash

## Deployment

This app is ready for deployment on platforms like:
- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please create an issue in the repository.

---

**Note**: This is a production-ready application with Firebase integration and modern React features.
