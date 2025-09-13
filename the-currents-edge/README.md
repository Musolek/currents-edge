# The Current's Edge - Book Microsite

A beautiful, responsive microsite for the YA Neo-African Futuristic novel "The Current's Edge" by Musole Kambinda. Built with React, Vite, TailwindCSS, and Framer Motion, inspired by the design of pasteapp.io.

## Features

- **Modern Design**: Clean, responsive layout inspired by pasteapp.io
- **Smooth Animations**: Beautiful scroll-triggered animations with Framer Motion
- **Interactive Elements**: 
  - Smooth scrolling navigation
  - Modal excerpt viewer
  - Email signup with localStorage
  - Parallax effects
- **Mobile Responsive**: Optimized for all screen sizes
- **Performance Optimized**: Built with Vite for fast loading

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd the-currents-edge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Content Updates

Edit the `BOOK` object in `src/components/BookMicrosite.jsx` to update:

- Book title and subtitle
- Author information
- Excerpt text
- Buy links
- Cover image (add to `public/` directory)
- Author photo (add to `public/` directory)

### Styling

The site uses TailwindCSS for styling. You can:

- Modify colors in `tailwind.config.js`
- Update component styles in `BookMicrosite.jsx`
- Add custom CSS in `src/index.css`

### Adding Images

1. Add your book cover image to `public/images/book-cover.jpg`
2. Add author photo to `public/images/author-photo.jpg`
3. Update the `BOOK` object to reference these images:

```javascript
const BOOK = {
  // ...
  cover: "/images/book-cover.jpg",
  author: {
    // ...
    photo: "/images/author-photo.jpg",
  },
};
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Deployment

This site can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Design inspiration from [pasteapp.io](https://pasteapp.io)
- Built with love for "The Current's Edge" by Musole Kambinda