# Interview Prep Hub 🚀

A modern, AI-powered interview preparation application that helps you master algorithms, system design, and behavioral questions. Built with vanilla JavaScript and powered by Google's Gemini AI.

## ✨ Features

- **Comprehensive Coverage**: 190+ topics across Algorithms, System Design, and Behavioral interviews
- **AI-Powered Content**: Get detailed explanations, code examples, and interview tips
- **Smart Caching**: Content is cached in your browser for offline access
- **Modern UI**: Clean, minimal design with dark/light theme support
- **Mobile Friendly**: Responsive design that works on all devices
- **No Build Process**: Simple static files - just open and run!

## 🚀 Quick Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for AI content generation)
- A Google AI Studio account (free)

### Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account

2. **Create a New API Key**
   - Click on "Get API Key" in the left sidebar
   - Click "Create API Key"
   - Choose "Create API key in new project" (recommended)
   - Copy the generated API key (keep it secure!)

   > ⚠️ **Important**: Keep your API key secure and never commit it to version control in production.

### Step 2: Configure the Application

1. **Clone or Download the Project**
   ```bash
   git clone <your-repo-url>
   cd prep-hub
   ```

2. **Update the API Key**
   - Open `js/data.js` in your text editor
   - Find the `CONFIG` object at the top of the file
   - Replace `'YOUR_API_KEY_HERE'` with your actual Gemini API key:

   ```javascript
   const CONFIG = {
       API_KEY: 'your-actual-api-key-here', // Replace with your Gemini API key
       API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
   };
   ```

### Step 3: Run the Application

You have two options to run the application:

#### Option A: Simple File Opening (Quick Start)
1. Navigate to the project folder
2. Double-click `index.html`
3. The application will open in your default browser

#### Option B: Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using Live Server (VS Code Extension):**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

4. **Access the Application**
   - Open your browser and go to `http://localhost:8000`
   - Start exploring interview topics!

## 📚 How to Use

1. **Choose a Category**: Select from Algorithms, System Design, or Behavioral in the sidebar
2. **Pick a Topic**: Browse through subcategories and click on any topic
3. **Get AI Explanations**: The app will generate comprehensive content including:
   - Detailed explanations
   - Code examples with syntax highlighting
   - Time and space complexity analysis
   - Interview tips and strategies
   - Practice problems

## 💾 Data Caching

- **Automatic Caching**: All generated content is automatically cached in your browser's IndexedDB
- **Offline Access**: Once content is loaded, you can access it offline
- **Performance**: Cached content loads instantly without API calls
- **Storage**: Content persists until you clear your browser data

### Managing Cache

- **View Cache**: Open browser Developer Tools → Application/Storage → IndexedDB → AlgoPrepCacheDB
- **Clear Cache**: Clear your browser data or delete the IndexedDB database
- **Cache Size**: No practical limit - modern browsers can store hundreds of MB

## 🛠️ Customization

### Adding New Topics

1. Open `js/data.js`
2. Find the `roadmap` array
3. Add new categories, subcategories, or topics following the existing structure:

```javascript
{
    title: "Your Category",
    children: [
        {
            title: "Your Subcategory", 
            children: ["Topic 1", "Topic 2", "Topic 3"]
        }
    ]
}
```

### Customizing AI Prompts

1. Open `js/data.js`
2. Modify the `createPrompt()` function to change how content is generated
3. Adjust prompts for different categories (Algorithms, System Design, Behavioral)

### Styling Changes

1. **Colors & Theme**: Edit `css/styles.css` for custom styling
2. **Layout**: Modify classes in `index.html` (uses Tailwind CSS)
3. **Components**: Update UI components in `js/ui.js`

## 🔧 Troubleshooting

### Common Issues

**"API Key not working"**
- Verify your API key is correct in `js/data.js`
- Check that your Google AI Studio account is active
- Ensure you're not exceeding API limits

**"Content not loading"**
- Check your internet connection
- Verify the API key is properly configured
- Check browser console for error messages

**"Mobile menu not working"**
- Ensure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors

**"Styling looks broken"**
- Verify internet connection (Tailwind CSS loads from CDN)
- Check if all CSS files are loading properly
- Try hard refresh (Ctrl+F5)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔐 Security Notes

- **API Key**: Never commit your actual API key to version control
- **Environment Variables**: Consider using environment variables for production
- **Rate Limiting**: Be mindful of API rate limits
- **Local Storage**: Data is stored locally in your browser only

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure your API key is correctly configured
4. Verify internet connectivity

---

**Happy Interview Preparation!** 🎯

Made with ❤️ for the developer community
