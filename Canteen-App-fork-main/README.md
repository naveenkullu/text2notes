# Canteen-App

## Firebase real authentication setup

This app now uses Firebase Authentication for:
- User login via Email/Password
- User signup via Email/Password (inside app)
- Admin login via Email/Password

### 1) Create Firebase project
- Go to Firebase Console
- Create project
- Add a **Web App** to get Firebase config values

### 2) Enable Firebase Authentication methods
- Enable **Email/Password** provider
- Create customer and admin users (email/password) in Authentication Users

### 3) Configure environment variables
Create a `.env` file in project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

### 4) Run app
```bash
npm install
npm start
```

### Notes
- Customers can create account directly from app (Customer → Sign Up).
- Admin account must already exist in Firebase and match `EXPO_PUBLIC_ADMIN_EMAIL`.