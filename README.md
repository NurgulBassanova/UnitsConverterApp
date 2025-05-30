# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## 📱 Features

### 👤 Account
- User authentication with Firebase (sign up, login, logout)
- Guest mode support
- View and update user profile preferences (theme and language)
  ![Converter Screen](./screens/account.jpg)

### 🔄 Converter
Multi-unit converter with support for several categories:
- **Time** – Convert between seconds, minutes, hours, and days
- **Length** – Convert between millimeters, centimeters, meters, kilometers, etc.
- **Temperature** – Convert between Celsius, Fahrenheit, and Kelvin
- **Weight** – Convert between grams, kilograms, pounds, and ounces
  ![Converter Screen](./screens/converter.jpg)

### ℹ️ About
- Learn more about the app and its development purpose
  ![Converter Screen](./screens/about.jpg)

### ⚙️ Settings
- Toggle between Light and Dark themes
- Switch app language:  
  - 🇬🇧 English  
  - 🇷🇺 Russian  
  - 🇰🇿 Kazakh
    ![Converter Screen](./screens/settings.jpg)

