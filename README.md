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
- **Local Storage**: Data persists in browser (no backend required for demo)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd SchoolSeller
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`

## Demo Users

The app comes with pre-configured demo users. Use password `password123` for all users:

### Sellers
- Alex Johnson (alex.johnson@school.edu)
- Sarah Chen (sarah.chen@school.edu)
- Mike Rodriguez (mike.rodriguez@school.edu)

### Buyers
- Jordan Smith (jordan.smith@school.edu)
- Sam Wilson (sam.wilson@school.edu)

## Usage

### For Sellers
1. Login as a seller
2. Add items to your inventory
3. Manage incoming reservations and orders
4. Toggle order approval on/off
5. Share your store link on social media
6. Track sales and analytics

### For Buyers
1. Login as a buyer
2. Browse available items by category
3. Reserve items you want to purchase
4. Track your order status
5. Complete transactions in person with cash

### For Admins
1. Login as admin (add admin user to data)
2. View platform analytics
3. Manage items and users
4. Monitor order activity

## Technical Details

### Built With
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Styling with custom utility classes
- **Local Storage** - Data persistence

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Login.js        # User authentication
│   ├── SellerDashboard.js
│   ├── BuyerDashboard.js
│   ├── ItemCard.js     # Item display component
│   ├── OrderCard.js    # Order display component
│   ├── AddItem.js      # Add new item form
│   ├── EditItem.js     # Edit item form
│   ├── ItemDetail.js   # Item detail view
│   ├── Orders.js       # Order management
│   ├── Profile.js      # User profile
│   └── AdminPanel.js   # Admin dashboard
├── utils/
│   └── dataManager.js  # Data management utilities
├── App.js              # Main app component
├── App.css             # App-specific styles
├── index.js            # App entry point
└── index.css           # Global styles
```

## Security Features for School Environment

1. **Content Moderation**: Admin panel for removing inappropriate content
2. **User Verification**: Email-based user identification
3. **Order Approval**: Optional approval system for transactions
4. **Cash-Only**: No payment processing reduces security risks
5. **Local Data**: No external data sharing

## Future Improvements

### UX Enhancements
- Real-time notifications
- In-app messaging between users
- Push notifications for order updates
- Advanced search and filtering
- Item categories and tags
- User ratings and reviews

### Security Enhancements
- User authentication with school email verification
- Content reporting system
- Automated content moderation
- User blocking/reporting features
- Transaction history and receipts

### Technical Improvements
- Backend API with database
- Real-time updates with WebSockets
- Image upload and storage
- Mobile app (React Native)
- Offline support with PWA
- Analytics and reporting dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Note**: This is a demo application for educational purposes. In a production environment, you would need to implement proper authentication, data validation, and security measures.

