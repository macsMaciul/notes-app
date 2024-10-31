# Notes App

A modern note-taking application built with Angular, Tailwind CSS, and Firebase.

## Features

- Create, edit, and delete notes
- Organize notes by categories
- Real-time updates with Firebase
- Responsive design
- Modern UI with hover effects and transitions

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database in your project
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon (</>)
   - Register your app and copy the Firebase configuration

3. Update Firebase configuration:
   - Open `src/environments/environment.ts`
   - Replace the placeholder values with your Firebase configuration:
```typescript
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

4. Run the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Firebase Database Structure

The application uses two collections in Firestore:

### Notes Collection
```typescript
{
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: Date;
}
```

### Categories Collection
```typescript
{
  id: string;
  name: string;
  color: string;
}
```

## Development

- Built with Angular 17
- Styled with Tailwind CSS
- Firebase for backend
- Responsive design for all screen sizes

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── add-note/
│   │   ├── note-card/
│   │   ├── note-list/
│   │   └── sidebar/
│   ├── models/
│   │   ├── note.interface.ts
│   │   └── category.interface.ts
│   ├── services/
│   │   └── firebase.service.ts
│   └── app.component.ts
├── environments/
│   └── environment.ts
└── styles.css
