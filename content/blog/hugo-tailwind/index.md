---
title: 'Building a Hugo Theme from Scratch with Tailwind CSS: A Step-by-Step Guide'
description: "Just an example post."
summary: "You can use blog posts for announcing product updates and features."
date: 2023-10-07T16:27:22+02:00
lastmod: 2023-10-07T16:27:22+02:00
toc: true
draft: false
weight: 50
categories: []
tags: []
contributors: []
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  robots: "" # custom robot tags (optional)
---

Creating a custom Hugo theme with Tailwind CSS gives you complete control over your site's design and performance. This guide will walk you through setting up a new Hugo theme from the ground up, integrating the Tailwind CSS framework, and progressively adding essential features like a responsive navigation bar, a blog, custom fonts, and a dark mode toggle.

## 1\. Initial Project Setup: Laying the Foundation

First, ensure you have the latest versions of Hugo and Node.js installed on your system. You can verify their installation by running `hugo version` and `node -v` in your terminal.

### Step 1: Create a New Hugo Site

```bash
hugo new site my-hugo-tailwind-site
cd my-hugo-tailwind-site
```

### Step 2: Initialize a New Hugo Theme

A theme keeps your site's presentation logic separate from its content.

```bash
hugo new theme my-theme
```

This command creates a `my-theme` directory inside the `themes` folder with the basic file structure of a Hugo theme.

### Step 3: Configure Your Site to Use the New Theme

Open your site's main configuration file, `hugo.toml`, and set the `theme` parameter.

```toml
// hugo.toml

baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = 'my-theme'
```

### Step 4: Initialize `package.json`

Navigate into your theme's directory to set up your Node.js dependencies.

```bash
cd themes/my-theme
npm init -y
```

### Step 5: Install Tailwind CSS and its Dependencies

Install Tailwind CSS, PostCSS, and Autoprefixer as development dependencies. These tools will process your CSS.

```bash
npm install -D tailwindcss postcss autoprefixer
```

### Step 6: Create Tailwind and PostCSS Configuration Files

In your theme's root directory (`themes/my-theme`), create `tailwind.config.js` and `postcss.config.js`.

**`tailwind.config.js`**

This file tells Tailwind where to look for class names in your theme.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './assets/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**`postcss.config.js`**

This file configures the plugins PostCSS will use.

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 2\. Integrating Tailwind CSS with Hugo Pipes

We'll use Hugo's built-in asset pipeline, Hugo Pipes, to process our CSS, eliminating the need for external bundlers.

### Step 1: Create Your Main CSS File

Inside your theme's directory, create an `assets/css` folder and a `main.css` file within it. This file is the entry point for Tailwind's directives.

**`themes/my-theme/assets/css/main.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 2: Include the Compiled CSS in Your Base Template

Hugo will process `main.css`, run it through PostCSS, and generate the final stylesheet. We need to include this in our theme's base layout.

Create a `head.html` partial in `themes/my-theme/layouts/partials/`.

**`themes/my-theme/layouts/partials/head.html`**

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Title }}</title>
    {{ $styles := resources.Get "css/main.css" | postCSS }}
    {{ if hugo.IsProduction }}
        {{ $styles = $styles | minify | fingerprint }}
    {{ end }}
    <link rel="stylesheet" href="{{ $styles.RelPermalink }}">
</head>
```

This code gets the CSS file, processes it with PostCSS, and in a production environment, minifies and fingerprints it for cache busting.

### Step 3: Create the Base and Homepage Layouts

The `baseof.html` file is the master template for your theme.

**`themes/my-theme/layouts/_default/baseof.html`**

```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
    {{- partial "head.html" . -}}
    <body class="bg-white text-gray-800">
        {{- block "main" . }}{{- end }}
    </body>
</html>
```

Create an `index.html` for your homepage in `themes/my-theme/layouts/`.

**`themes/my-theme/layouts/index.html`**

```html
{{ define "main" }}
<div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold my-8">Welcome to My Hugo Site!</h1>
    <p>This is the homepage of your new Hugo theme with Tailwind CSS.</p>
</div>
{{ end }}
```

Now, run the Hugo server from the root of your project.

```bash
hugo server
```

Navigate to `http://localhost:1313/`, and you should see your basic homepage with Tailwind CSS styles applied.

## 3\. Adding Features Incrementally

With the foundation in place, let's add common website features one by one.

### Feature 1: A Responsive Navigation Bar

#### Step 1: Create Header and Footer Partials

Create `header.html` and `footer.html` in `themes/my-theme/layouts/partials/`.

**`themes/my-theme/layouts/partials/header.html`**

```html
<header class="bg-gray-800 text-white p-4">
    <nav class="container mx-auto flex justify-between items-center">
        <a href="{{ .Site.BaseURL }}" class="text-xl font-bold">{{ .Site.Title }}</a>
        <button id="mobile-menu-button" class="md:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        <ul id="main-menu" class="hidden md:flex space-x-4">
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Blog</a></li>
        </ul>
    </nav>
</header>
```

**`themes/my-theme/layouts/partials/footer.html`**

```html
<footer class="bg-gray-200 text-center p-4 mt-8">
    <p>&copy; {{ now.Format "2006" }} {{ .Site.Title }}</p>
</footer>
```

#### Step 2: Update `baseof.html` and Add JavaScript

Update `baseof.html` to include the new partials and the JavaScript needed to toggle the mobile menu.

```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
    {{- partial "head.html" . -}}
    <body class="bg-white text-gray-800 flex flex-col min-h-screen">
        {{- partial "header.html" . -}}
        <main class="flex-grow">
            {{- block "main" . }}{{- end }}
        </main>
        {{- partial "footer.html" . -}}

        <script>
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mainMenu = document.getElementById('main-menu');

            mobileMenuButton.addEventListener('click', () => {
                // A simple class toggle would be less verbose, 
                // but this illustrates direct style manipulation if needed.
                mainMenu.classList.toggle('hidden');
                mainMenu.classList.toggle('flex');
                mainMenu.classList.toggle('flex-col');
                mainMenu.classList.toggle('absolute');
                mainMenu.classList.toggle('top-16');
                mainMenu.classList.toggle('left-0');
                mainMenu.classList.toggle('w-full');
                mainMenu.classList.toggle('bg-gray-800');
            });
        </script>
    </body>
</html>
```

### Feature 2: Adding a Blog Section

#### Step 1: Create List and Single Page Templates

Create templates for the blog listing (`list.html`) and individual blog posts (`single.html`) inside a new `blog` directory in your layouts.

**`themes/my-theme/layouts/blog/list.html`**

```html
{{ define "main" }}
<div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold my-8">{{ .Title }}</h1>
    <ul>
        {{ range .Pages }}
        <li class="mb-4">
            <a href="{{ .Permalink }}" class="text-2xl font-semibold text-blue-600 hover:underline">{{ .Title }}</a>
            <p class="text-gray-600">{{ .Date.Format "January 2, 2006" }}</p>
        </li>
        {{ end }}
    </ul>
</div>
{{ end }}
```

**`themes/my-theme/layouts/blog/single.html`**

```html
{{ define "main" }}
<article class="prose lg:prose-xl mx-auto my-8 px-4">
    <h1>{{ .Title }}</h1>
    <p class="text-gray-500">Published on {{ .Date.Format "January 2, 2006" }}</p>
    <div>{{ .Content }}</div>
</article>
{{ end }}
```

**Note:** The `prose` classes provide nice default styling for markdown content. To enable them, install the Tailwind CSS Typography plugin: `npm install -D @tailwindcss/typography` and add `require('@tailwindcss/typography')` to the `plugins` array in your `tailwind.config.js`.

#### Step 2: Create Blog Content

In the root of your project, create a `blog` section.

**`content/blog/_index.md`**

```markdown
---
title: "Blog"
---
```

And a sample blog post:

**`content/blog/my-first-post.md`**

```markdown
---
title: "My First Post"
date: 2025-06-28
---

This is the content of my first blog post, written in Markdown.
```

### Feature 3: Adding a Custom Font

#### Step 1: Import the Font in Your CSS

We'll use "Inter" from Google Fonts. Add the `@import` rule at the top of your `main.css` file.

**`themes/my-theme/assets/css/main.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Step 2: Extend Your Tailwind Configuration

Add the font to your theme in `tailwind.config.js` so you can use it with Tailwind's font utilities.

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  // ...
}
```

### Feature 4: Implementing Dark Mode

#### Step 1: Enable Dark Mode in Tailwind

In `tailwind.config.js`, set `darkMode` to `'class'`, which allows toggling dark mode based on a class in the HTML.

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // ... rest of the config
}
```

#### Step 2: Add a Theme Toggler Button and Script

Add a toggle button to your `header.html` and the corresponding JavaScript to `baseof.html`.

**In `header.html` (inside the `<nav>`):**

```html
<button id="theme-toggle" class="ml-4" title="Toggles light & dark">
    <svg id="theme-toggle-dark-icon" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    <svg id="theme-toggle-light-icon" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.05 14.95a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm-2.12-10.607a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM15 10a5 5 0 11-10 0 5 5 0 0110 0z"></path></svg>
</button>
```

**In `baseof.html` (before `</body>`):**

```javascript
<script>
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Set initial theme based on localStorage or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        htmlEl.classList.remove('dark');
        themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        htmlEl.classList.toggle('dark');
        const isDark = htmlEl.classList.contains('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        themeToggleDarkIcon.classList.toggle('hidden', !isDark);
        themeToggleLightIcon.classList.toggle('hidden', isDark);
    });
</script>
```

#### Step 3: Add Dark Mode Styles

Update your `<body>` tag in `baseof.html` and use `dark:` variant classes throughout your theme.

**`themes/my-theme/layouts/_default/baseof.html`**

```html
<body class="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 flex flex-col min-h-screen">
```

Now you can use `dark:` prefixes to style elements for dark mode. For example, to make your article content dark-mode friendly with the typography plugin, use `dark:prose-invert`.
