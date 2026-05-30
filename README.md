# 🤖 Kiro — AI Image Generation Studio

A sleek, cyberpunk-themed AI image generation studio powered by **Pollinations.ai's FLUX model**. Generate stunning images from text prompts — completely free, no API key required.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Pollinations](https://img.shields.io/badge/Pollinations.ai-FLUX-00E5FF)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎨 Image Generation
- **Text-to-Image** — Describe any image and Kiro generates it using FLUX Schnell
- **Negative Prompts** — Specify what to avoid (e.g., blurry, watermark, distortion)
- **Cache-Busting** — Every request generates a unique image, even with the same prompt

### ⚙️ Advanced Controls
- **Lighting Styles** — Neon, Cinematic, Holographic, Studio, Golden Hour, Dark Moody
- **Style Presets** — Cyberpunk, Corporate, Futuristic, Minimal, Synthwave, Glitch Art
- **Aspect Ratios** — 1:1 Square, 16:9 Wide, 9:16 Portrait, 4:3 Classic
- **Category Tags** — Organize generated images (Logo, Hero, Icon, Portrait, Background, UI Asset)

### 💬 Chat Interface
- Conversational chat-based workflow — type a prompt, get an image
- Real-time loading animation during generation
- **Save to Gallery** — Persist generated images in local storage
- **Download** — Save images directly to your device
- **Regenerate** — One-click re-generation with the same prompt

### 🎯 Design
- Cyberpunk-corporate glassmorphism UI
- Dark theme with neon accents (cyan, purple, green)
- Custom fonts: Orbitron, Rajdhani, JetBrains Mono
- Responsive layout for all screen sizes

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Bundler** | Vite 8 |
| **Routing** | React Router DOM 7 |
| **Icons** | Lucide React |
| **AI Model** | FLUX Schnell via [Pollinations.ai](https://pollinations.ai) |
| **Styling** | Vanilla CSS with CSS custom properties |
| **State** | React Context API + localStorage |
| **Hosting** | Netlify |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatBot.jsx          # Main chat interface with image generation
│   ├── PromptBuilder.jsx    # Advanced settings panel (lighting, style, etc.)
│   ├── ImageCard.jsx        # Gallery image card component
│   ├── FloatingChat.jsx     # Floating chat widget
│   ├── Sidebar.jsx          # Navigation sidebar
│   └── ToastContainer.jsx   # Toast notification system
├── context/
│   └── AppContext.jsx       # Global state (gallery, toasts)
├── pages/
│   ├── SimpleChat.jsx       # Main page — chat + gallery
│   ├── Home.jsx             # Landing page
│   ├── GalleryPage.jsx      # Full gallery view
│   ├── GeneratePage.jsx     # Standalone generator
│   └── SettingsPage.jsx     # App settings
├── utils/
│   └── api.js               # Pollinations API integration & prompt builder
├── App.jsx                  # Root component with routing
├── main.jsx                 # Entry point
├── index.css                # Global styles & design system
└── App.css                  # App-level styles
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Diwakaran-S/Kiro-Image-Generation-AI-.git
cd Kiro-Image-Generation-AI-

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## 🌐 Deployment (Netlify)

This project is configured for one-click Netlify deployment:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Branch** | `main` |

A `_redirects` file is included in `public/` for React Router SPA support.

> **No environment variables needed** — the app uses the free Pollinations.ai API (no API key required).

---

## 🔌 API — Pollinations.ai

Kiro uses [Pollinations.ai](https://pollinations.ai) for image generation — a free, open-source AI platform.

**Endpoint:** `https://image.pollinations.ai/prompt/{prompt}`

| Parameter | Description |
|-----------|-------------|
| `model` | `flux` (FLUX Schnell — fast & free) |
| `width` / `height` | Image dimensions based on aspect ratio |
| `seed` | Random seed for unique generations |
| `negative_prompt` | Things to avoid in the image |
| `nologo` | Removes Pollinations watermark |
| `nofeed` | Keeps generations private |

### How Prompt Building Works

1. **User prompt** → base description
2. **Lighting modifier** → appended (e.g., "cinematic lighting, dramatic shadows")
3. **Style preset** → appended (e.g., "cyberpunk aesthetic, neon city")
4. **Quality boost** → always appended ("high quality, detailed, sharp focus, 8k uhd")
5. **Negative prompt** → sent separately to avoid unwanted artifacts

---

## 📸 Screenshots

> Generate images by typing prompts in the chat interface. Use the advanced settings panel to fine-tune lighting, style, and aspect ratio.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Diwakaran S**

- GitHub: [@Diwakaran-S](https://github.com/Diwakaran-S)

---

<p align="center">
  Built with ❤️ using React + Pollinations.ai
</p>
