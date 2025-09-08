
**COMBO UTILITY** - Making text processing simple and efficient! 🚀


## 🚀 Features

### 🎯 Combo Filter Tools
Comprehensive text processing and optimization tools for managing combo lists and data:

- **Combo Optimiser** 🎯 - Complete optimization pipeline (capture removal + deduplication + empty line removal)
- **Capture Remover** ✂️ - Extract valid email:password combinations from mixed text
- **Remove Duplicate** 🔍 - Remove duplicate lines from your data
- **Get Duplicate** 📋 - Find and extract only the duplicate lines
- **Randomize** 🎲 - Randomly shuffle the order of lines
- **Remove Empty Lines** 🧹 - Clean up empty lines from your text
- **Sort Lines** 📊 - Alphabetically sort all lines
- **Email:Pass→ User:Pass** 👤 - Convert email:password format to username:password
- **Email:Pass→ Email** 📧 - Extract only email addresses from email:password combinations

### 🔐 Password Tools
Advanced password validation and modification tools:

- **Pass Optimiser** 🔐 - Filter passwords based on length and character requirements
  - Minimum/maximum length filtering
  - Must contain: uppercase, lowercase, numbers, symbols
- **Insert Text** ✏️ - Add text before or after passwords
- **Modify** 🔧 - Change password case (uppercase/lowercase)
- **Not Contains** 🚫 - Filter passwords that don't contain specific character types

### 📧 Mail Filter Tools
Email domain filtering and management:

- **Mail Filter** 📬 - Filter emails by specific domain
  - Exact match or partial match options
- **Multi-Domain** 🌐 - Filter and separate emails by multiple domains
  - View results by domain
  - Option to show remaining emails

### 🗑️ Remove List Tools
List management and cleanup:

- **Remove List** 🗑️ - Remove specific items from your data
  - Exact match or partial match options
  - Option to show removed items

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Animations**: Tailwind CSS animations + custom effects

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Jahlo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📖 How to Use

1. **Select a Category**: Choose from Combo Filter, Password Tools, Mail Filter, or Remove List
2. **Pick a Tool**: Select the specific tool you need from the sidebar
3. **Configure Options**: Adjust tool-specific settings in the options panel
4. **Input Your Data**: Paste your text data into the input area
5. **Process**: Click the process button to transform your data
6. **Copy Results**: Use the copy button to get your processed data

## 🎨 Features

- **Modern UI**: Clean, responsive design with dark theme
- **Real-time Processing**: Instant text transformation
- **Copy to Clipboard**: Easy result copying
- **Toast Notifications**: User feedback for actions
- **Animated Interface**: Smooth transitions and effects
- **Mobile Responsive**: Works on all device sizes

## 📝 Data Formats

The application works with various text formats:

- **Email:Password**: `user@domain.com:password123`
- **Username:Password**: `username:password123`
- **Email Lists**: One email per line
- **General Text**: Any line-based text data

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── options/        # Tool-specific option panels
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
└── utils/              # Text processing utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

