# Firebase Setup Instructions

## To Fix the Permissions Error:

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init firestore
```
- Select your project: `schoolseller-f474f`
- Choose `firestore.rules` as the rules file
- Choose `firestore.indexes.json` as the indexes file

### 4. Deploy the rules
```bash
firebase deploy --only firestore:rules
```

## Alternative: Manual Setup in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `schoolseller-f474f`
3. Go to Firestore Database → Rules
4. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read and write items
    match /items/{itemId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read and write orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read and write settings
    match /settings/{settingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

5. Click "Publish"

## Current Status
The app now works with localStorage as a fallback, so the permissions error won't break the functionality. Once you deploy the Firestore rules, the app will use Firestore for data persistence.


