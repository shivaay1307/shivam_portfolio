# Shivam Portfolio

A modern, responsive portfolio website built with Gatsby, featuring smooth animations with GSAP and a beautiful UI.

## 🚀 Features

- **Modern Design**: Clean and professional portfolio layout
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Built with Gatsby for optimal loading speeds
- **Image Optimization**: Automatic image optimization with Gatsby plugins
- **Font Variety**: Multiple font families including Inter, Josefin Sans, Montserrat, and more

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**

### Check your Node.js version:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## 🛠️ Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd shivamportfolio
   
   # Or simply navigate to the project folder if you already have it
   cd "path/to/your/project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## 🏃‍♂️ Running the Project

### Development Mode
To run the project in development mode with hot reloading:

```bash
npm run develop
# or
yarn develop
# or
npm start
```

The site will be available at `http://localhost:8000`

### Production Build
To create a production build:

```bash
npm run build
# or
yarn build
```

### Serve Production Build
To serve the production build locally:

```bash
npm run serve
# or
yarn serve
```

The production site will be available at `http://localhost:9000`

## 📁 Project Structure

```
src/
├── assets/
│   └── fonts/          # Custom fonts (Inter, Josefin Sans, Montserrat, etc.)
├── components/         # React components
│   ├── frontpage.js    # Main homepage component
│   ├── header.js       # Navigation header
│   ├── layout.js       # Main layout wrapper
│   └── ...
├── Gsap/              # GSAP animation utilities
├── images/            # Static images and project assets
└── pages/             # Gatsby pages
    └── index.js       # Main homepage
```

## 🎨 Customization

### Adding New Projects
1. Add project images to `src/images/projects/`
2. Update project data in `src/components/data.js`

### Changing Fonts
The project includes multiple font families. You can modify font usage in the CSS files.

### Styling
- Main styles: `src/components/frontpage.css`
- Page styles: `src/pages/index.css`

## 🛠️ Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clean` - Clean Gatsby cache
- `npm run format` - Format code with Prettier

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8000
   npx kill-port 8000
   # Then run develop again
   npm run develop
   ```

2. **Node modules issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Gatsby cache issues**
   ```bash
   npm run clean
   npm run develop
   ```

### Performance Tips

- Use `npm run build` to test production performance
- Check the Network tab in browser DevTools for loading times
- Optimize images before adding them to the project

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the 0BSD License.

## 📞 Contact

For questions or support, please contact the project maintainer.

---

**Happy coding! 🎉**