# Stephen Braund Portfolio

A minimalist portfolio website for copywriter, communications manager, and photographer Stephen Braund. Built with Jekyll and hosted on GitHub Pages with Cloudflare CDN.

## Features

- 🎨 Clean, minimalist design with cool colour palette
- 🌓 Dark mode toggle
- 📱 Fully responsive (mobile-first)
- 🖼️ Masonry portfolio grid with multi-tag filtering
- 🔍 Lightbox image viewer with gallery support
- 🎠 Homepage carousel for featured work
- ✍️ Markdown blog with Jekyll
- 📧 Contact form via Formspree
- ⚡ Lazy loading images
- 🔒 HTTPS via Cloudflare
- 🎯 SEO optimised

## Local Development

### Prerequisites

You have these installed already:
- Ruby (check: `ruby -v`)
- Jekyll (check: `jekyll -v`)
- Bundler (check: `bundle -v`)
- Git
- GitHub Desktop

### Setup

1. **Clone or navigate to your repository**
   ```bash
   cd /path/to/braund-portfolio
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

4. **View in browser**
   - Open: `http://localhost:4000`
   - Site auto-refreshes when you save changes

### Common Jekyll Commands

```bash
# Serve site locally
bundle exec jekyll serve

# Serve with drafts
bundle exec jekyll serve --drafts

# Build site (output to _site/)
bundle exec jekyll build

# Clean build files
bundle exec jekyll clean
```

## Adding Content

### Portfolio Items

Edit `_data/portfolio.yml` to add/edit portfolio pieces:

```yaml
- title: "Your Project Title"
  tags: [photography, writing, strategy]  # Multiple tags allowed
  description: "Brief description of the project and your role."
  image: "portfolio/main-image.jpg"  # Main thumbnail
  gallery:  # Additional images for lightbox
    - "portfolio/image-1.jpg"
    - "portfolio/image-2.jpg"
    - "portfolio/image-3.jpg"
  year: 2024
  client: "Client Name"  # Optional
  featured: true  # Optional - shows in homepage carousel
```

**Image locations:**
- Place images in `/assets/images/portfolio/`
- Recommended size: 1600-2000px wide, under 500KB each

### Blog Posts

1. **Write in IA Writer** (or any text editor)

2. **Create file** in `_posts` folder with format:
   ```
   YYYY-MM-DD-post-title.md
   ```
   Example: `2026-01-30-my-first-post.md`

3. **Add front matter:**
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2026-01-30
   category: photography  # Optional
   description: "Meta description for SEO"
   image: "your-image.jpg"  # Optional featured image
   ---
   
   Your markdown content here...
   ```

4. **Save and commit** - the post appears automatically!

**Blog images:**
- Place in `/assets/images/blog/`
- Reference in post: `![Alt text](/assets/images/blog/your-image.jpg)`

### About Page

Edit `/about/index.html` and replace the placeholder bio with your actual content.

### Images

**Recommended specifications:**
- **Portfolio thumbnails:** 1600-2000px wide, JPG, 80-85% quality
- **Gallery images:** 2000px wide max, JPG, 80-85% quality
- **Blog images:** 1200px wide, JPG, 80-85% quality
- **Target file size:** Under 500KB per image

**Optimisation tips:**
1. Export from Lightroom/Photoshop at 80-85% quality
2. Use Preview on Mac: File > Export > Adjust quality slider
3. Or use ImageOptim (free Mac app)

## Deployment to GitHub Pages

### Initial Setup

1. **Create GitHub repository**
   - Repository name: `braund-portfolio` (or `yourusername.github.io`)
   - Make it public
   - Don't initialise with README (you already have one)

2. **Using GitHub Desktop:**
   - File > Add Local Repository
   - Choose your `braund-portfolio` folder
   - Publish repository to GitHub

3. **Enable GitHub Pages:**
   - Go to repository on github.com
   - Settings > Pages
   - Source: Deploy from branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Save

4. **Wait 2-5 minutes** - your site will be live at:
   `https://yourusername.github.io/braund-portfolio/`

### Updates

After making changes:

1. **Commit in GitHub Desktop:**
   - Review changed files
   - Write commit message
   - Click "Commit to main"

2. **Push to GitHub:**
   - Click "Push origin"

3. **Wait ~1 minute** - changes are live!

## Custom Domain Setup (braund.ca)

### Step 1: Configure GitHub Pages

1. In your repository on GitHub:
   - Settings > Pages
   - Custom domain: Enter `braund.ca`
   - Save
   - Check "Enforce HTTPS" (after DNS propagates)

2. The `CNAME` file is already created with `braund.ca`

### Step 2: Configure Cloudflare

1. **Sign up / Log in to Cloudflare**
   - Go to: https://dash.cloudflare.com/sign-up
   - Add your domain: `braund.ca`

2. **Cloudflare will scan your DNS**
   - Review existing records
   - Click Continue

3. **Choose Free plan**

4. **Cloudflare provides nameservers** (something like):
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```

### Step 3: Update CanSpace Nameservers

1. **Log in to CanSpace**
   - Go to: https://www.canspace.ca/
   - Log in to your account

2. **Find your domain** (`braund.ca`)

3. **Change nameservers:**
   - Look for "Name Servers" or "DNS Management"
   - Change from CanSpace nameservers to Cloudflare nameservers
   - Enter the two nameservers Cloudflare provided
   - Save changes

4. **Wait for propagation** (2-24 hours, usually faster)

### Step 4: Configure DNS in Cloudflare

Once nameservers are updated:

1. **In Cloudflare dashboard > DNS**

2. **Add these records:**

   **A Records (IPv4):**
   | Type | Name | Content | Proxy Status |
   |------|------|---------|--------------|
   | A | @ | 185.199.108.153 | Proxied (orange cloud) |
   | A | @ | 185.199.109.153 | Proxied (orange cloud) |
   | A | @ | 185.199.110.153 | Proxied (orange cloud) |
   | A | @ | 185.199.111.153 | Proxied (orange cloud) |

   **CNAME Record (www subdomain):**
   | Type | Name | Content | Proxy Status |
   |------|------|---------|--------------|
   | CNAME | www | yourusername.github.io | Proxied (orange cloud) |

3. **Important:** Make sure all records are **Proxied** (orange cloud icon)

### Step 5: Configure Cloudflare Settings

1. **SSL/TLS tab:**
   - Encryption mode: "Full" or "Full (strict)"

2. **Speed > Optimisation:**
   - Auto Minify: Check HTML, CSS, JS
   - Brotli: On
   - Rocket Loader: Off (can cause issues with custom JS)

3. **Caching:**
   - Caching Level: Standard
   - Browser Cache TTL: 4 hours (or your preference)

4. **Security:**
   - Security Level: Medium
   - SSL: Full

### Verification

1. **Test your site:**
   ```bash
   # Check if DNS has propagated
   dig braund.ca
   
   # Or use online tool:
   https://www.whatsmydns.net/
   ```

2. **Visit your site:**
   - http://braund.ca (should redirect to https)
   - https://braund.ca (should work)
   - https://www.braund.ca (should work)

3. **Force HTTPS in GitHub Pages:**
   - Settings > Pages
   - Check "Enforce HTTPS" (only works after DNS propagates)

## Troubleshooting

### Site not loading after domain setup
- Wait 24 hours for DNS propagation
- Clear browser cache
- Check Cloudflare DNS settings are correct
- Verify CNAME file contains only `braund.ca`

### Images not showing
- Check file paths are correct (case-sensitive!)
- Images must be in `/assets/images/`
- Check image filenames match exactly (no spaces)

### CSS not loading
- Run `bundle exec jekyll clean`
- Delete `_site` folder
- Run `bundle exec jekyll build`
- Clear browser cache

### Portfolio filter not working
- Check JavaScript console for errors (F12 in browser)
- Verify portfolio.js is loading
- Check data-tags in portfolio.yml match filter buttons

### Changes not appearing on live site
- Wait 1-2 minutes after pushing
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear Cloudflare cache: Caching > Purge Everything

### Form not working
- Verify Formspree form ID in `_config.yml`
- Check form action URL is correct
- Test form submission

## Customisation

### Colours

Edit `/assets/_sass/_base.scss` - change the hex codes in the `:root` section:

```scss
:root {
  --colour-primary: #2563eb;    /* Main blue */
  --colour-secondary: #0891b2;  /* Cyan accent */
  --colour-accent: #3b82f6;     /* Bright blue */
  /* ... etc ... */
}
```

### Typography

To change fonts, edit:
1. Font imports in `_layouts/default.html`
2. Font variables in `_sass/_base.scss`

### Layout

- Header/Nav: `_includes/header.html` and `_sass/_header.scss`
- Footer: `_includes/footer.html` and `_sass/_footer.scss`
- Portfolio: `portfolio/index.html` and `_sass/_portfolio.scss`
- Blog: `blog/index.html` and `_sass/_blog.scss`

## File Structure

```
braund-portfolio/
├── _data/
│   └── portfolio.yml          # Portfolio content
├── _includes/
│   ├── header.html           # Navigation
│   ├── footer.html           # Footer with contact form
│   └── lightbox.html         # Image lightbox
├── _layouts/
│   ├── default.html          # Base template
│   └── post.html             # Blog post template
├── _posts/                   # Blog posts (markdown)
│   └── YYYY-MM-DD-title.md
├── _sass/                    # Stylesheets (SCSS)
│   ├── _base.scss
│   ├── _header.scss
│   ├── _carousel.scss
│   ├── _portfolio.scss
│   ├── _lightbox.scss
│   ├── _blog.scss
│   └── _footer.scss
├── assets/
│   ├── css/
│   │   └── main.scss         # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   ├── carousel.js       # Homepage carousel
│   │   └── portfolio.js      # Filtering & lightbox
│   └── images/               # All images
│       ├── portfolio/
│       ├── blog/
│       └── about/
├── about/
│   └── index.html            # About page
├── blog/
│   └── index.html            # Blog listing
├── contact/
│   └── index.html            # Contact page
├── portfolio/
│   └── index.html            # Portfolio page
├── _config.yml               # Site configuration
├── CNAME                     # Custom domain
├── Gemfile                   # Ruby dependencies
├── index.html                # Homepage
└── README.md                 # This file
```

## Resources

- **Jekyll Documentation:** https://jekyllrb.com/docs/
- **Markdown Guide:** https://www.markdownguide.org/
- **GitHub Pages:** https://docs.github.com/en/pages
- **Cloudflare Docs:** https://developers.cloudflare.com/
- **Formspree:** https://formspree.io/
- **IA Writer:** https://ia.net/writer

## Support

If you run into issues:
1. Check this README's Troubleshooting section
2. Search GitHub Issues for Jekyll
3. Check Jekyll documentation
4. Review browser console for errors (F12)

## License

This is your personal portfolio - all content © Stephen Braund.

---

**Ready to get started?**

1. Run `bundle install`
2. Run `bundle exec jekyll serve`
3. Edit `_data/portfolio.yml` with your work
4. Replace placeholder content in `/about/`
5. Add your images to `/assets/images/`
6. Push to GitHub
7. Configure domain
8. You're live! 🚀
