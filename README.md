# PrettyMail - AI-Powered Email Composer

A modern, beautiful email composition interface powered by AI, featuring Gmail integration and intuitive design.

## 🚀 Features

- **AI-Powered Email Drafting**: Intelligent email composition with context-aware suggestions
- **Gmail Integration**: Full Gmail API integration for drafts and sending
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Google OAuth**: Secure authentication with Google accounts
- **Real-time Preview**: Live preview of emails as you compose them
- **Template Gallery**: Pre-built email templates for various use cases
- **Dark/Light Mode**: Automatic theme switching based on user preference

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: Google OAuth 2.0
- **API Integration**: Gmail API, Google APIs
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Console project with Gmail API enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prettymail-unified
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Add your Google OAuth credentials:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

### Environment Variables (Production)

Set these in your Vercel dashboard:

- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `VITE_GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret

## 📱 Usage

1. **Sign In**: Use your Google account to authenticate
2. **Compose**: Start writing your email or use AI assistance
3. **Preview**: See how your email will look to recipients
4. **Send**: Send directly through Gmail or save as draft

## 🔧 Configuration

### Google Cloud Console Setup

1. Create a new project in Google Cloud Console
2. Enable the Gmail API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - `http://localhost:8080` (development)
   - `https://your-domain.vercel.app` (production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Note**: This is an MVP version focused on core email composition features. Additional features and improvements are planned for future releases.
