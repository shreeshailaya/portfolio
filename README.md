# 🚀 Shreeshail Vitkar - Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies. Features stunning 3D animations, interactive elements, and a professional design that showcases skills and projects effectively.

## 🌐 **Live Demo**
**[View Live Portfolio → helloshree.com](https://helloshree.com)**

## ✨ **Features**

### 🎨 **Visual Excellence**
- **3D Animations**: Three.js powered interactive 3D elements
- **Smooth Transitions**: GSAP and Anime.js for fluid animations
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Dark/Light Theme**: Dynamic theme switching with smooth transitions

### 🛠️ **Technical Features**
- **Modern Stack**: Vite, Three.js, GSAP, Anime.js
- **Performance Optimized**: Lazy loading and efficient rendering
- **SEO Ready**: Semantic HTML and meta tags
- **Accessibility**: ARIA labels and keyboard navigation

### 📱 **Interactive Elements**
- **3D Particle Systems**: Dynamic background animations
- **Interactive Navigation**: Smooth scrolling with active states
- **Contact Form**: Integrated API with real-time validation
- **Responsive Grid**: Adaptive layouts for all devices

## 🏗️ **Tech Stack**

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Modern JavaScript features
- **Vite** - Fast build tool and dev server

### **3D & Animation**
- **Three.js** - 3D graphics and animations
- **GSAP** - Professional animation library
- **Anime.js** - Lightweight animation engine

### **Build Tools**
- **Vite** - Next-generation frontend tooling
- **npm** - Package management

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreeshailaya/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.sample .env
   # Edit .env with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### **Build for Production**
```bash
npm run build
```

## ⚙️ **Configuration**

### **Environment Variables**
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_ENDPOINT=https://your-api-endpoint.com/contact
VITE_API_BEARER_TOKEN=your_bearer_token_here

# Contact Form Configuration
VITE_SEND_TO_EMAIL=your-email@example.com
VITE_SOURCE=yourdomain.com
```

### **Customization**
- **Colors**: Modify CSS variables in `style.css`
- **Content**: Update HTML content in `index.html`
- **Animations**: Adjust animation parameters in `main.js`
- **3D Elements**: Customize Three.js scenes in `main.js`

## 📁 **Project Structure**

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── main.js            # Main JavaScript logic
├── 3d-text.js         # 3D text system
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (not in git)
├── .env.sample        # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🎯 **Key Components**

### **Hero Section**
- Animated 3D text with handwriting effect
- Interactive particle background
- Smooth scroll indicators

### **About Section**
- Skills showcase with animated statistics
- GitHub integration for live stats
- Professional experience highlights

### **Services Section**
- Service cards with hover effects
- Technology stack display
- Interactive elements

### **Contact Form**
- Real-time validation
- API integration
- Success/error handling

## 🌟 **Contributing**

We welcome contributions! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Report bugs** - Open an issue with detailed information
- 💡 **Suggest features** - Share your ideas for improvements
- 🔧 **Fix bugs** - Submit pull requests for bug fixes
- ✨ **Add features** - Implement new functionality
- 📚 **Improve docs** - Help make the documentation better

### **Contribution Guidelines**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Code Style**
- Follow existing code formatting
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

## 🐛 **Troubleshooting**

### **Common Issues**

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3D Elements Not Loading**
- Check browser console for errors
- Ensure WebGL is supported
- Verify Three.js dependencies

**Contact Form Issues**
- Check environment variables
- Verify API endpoint accessibility
- Check CORS configuration

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Anime.js** - Lightweight animations
- **Vite** - Build tool
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📞 **Contact**

- **Portfolio**: [helloshree.com](https://helloshree.com)
- **GitHub**: [@shreeshailaya](https://github.com/shreeshailaya)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/shreeshailaya/)

## ⭐ **Support the Project**

If you find this project helpful, please consider:

- ⭐ **Starring the repository**
- 🔀 **Forking for your own use**
- 💬 **Sharing with others**
- 🐛 **Reporting issues**
- 🔧 **Contributing code**

---

**Built with ❤️ by [Shreeshail Vitkar](https://helloshree.com)**

*Feel free to use this template for your own portfolio!* 