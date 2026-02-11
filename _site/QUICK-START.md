# Quick Start Guide

## What You Have

✅ Complete Jekyll portfolio website
✅ Multi-tag portfolio filtering  
✅ Lightbox image viewer
✅ Homepage carousel
✅ Blog with markdown support
✅ Contact form (Formspree)
✅ Dark mode toggle
✅ Fully responsive
✅ Ready for GitHub Pages + Cloudflare

## Immediate Next Steps

### 1. Test Locally (5 minutes)

```bash
cd /path/to/braund-portfolio
bundle install
bundle exec jekyll serve
```

Open browser: `http://localhost:4000`

Browse around, test the:
- Navigation and dark mode toggle
- Homepage carousel
- Portfolio filtering
- Lightbox (click portfolio items)
- Contact form (won't send yet - that's fine)
- Blog

### 2. Add Your Content

#### Portfolio Items (Priority)

**File:** `_data/portfolio.yml`

Replace the placeholder items with your actual work:

```yaml
- title: "Your Real Project"
  tags: [photography, strategy]  # Choose from: photography, writing, strategy, editorial, campaigns
  description: "What you did, your role, the impact."
  image: "portfolio/your-image.jpg"
  gallery:
    - "portfolio/your-image.jpg"
    - "portfolio/your-image-2.jpg"
  year: 2024
  client: "Client Name"
```

**Images:**
1. Optimise your images (1600-2000px wide, under 500KB)
2. Place in `/assets/images/portfolio/`
3. Update filenames in `portfolio.yml`

#### About Page

**File:** `/about/index.html`

Replace the `[Your bio...]` placeholders with your actual bio (3 paragraphs).

#### Homepage

**File:** `/index.html`

Optional: Update the intro text to match your voice.

### 3. Deploy to GitHub

#### Using GitHub Desktop:

1. **Add Repository:**
   - File > Add Local Repository
   - Select your `braund-portfolio` folder

2. **Create Repository:**
   - Publish repository
   - Name: `braund-portfolio`
   - Keep public
   - Publish

3. **Enable GitHub Pages:**
   - Visit your repo on github.com
   - Settings > Pages
   - Source: Deploy from branch
   - Branch: `main`
   - Save

4. **Wait 2-5 minutes**
   - Your site will be at: `https://[yourusername].github.io/braund-portfolio/`

### 4. Connect Custom Domain (braund.ca)

#### A. Cloudflare Setup

1. Go to: https://dash.cloudflare.com/sign-up
2. Add domain: `braund.ca`
3. Choose Free plan
4. Note the nameservers Cloudflare provides

#### B. Update CanSpace

1. Log in to: https://www.canspace.ca/
2. Find your domain
3. Change nameservers to Cloudflare's
4. Save (wait 2-24 hours for propagation)

#### C. Configure Cloudflare DNS

Add these records (after nameservers update):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 185.199.108.153 | Proxied ☁️ |
| A | @ | 185.199.109.153 | Proxied ☁️ |
| A | @ | 185.199.110.153 | Proxied ☁️ |
| A | @ | 185.199.111.153 | Proxied ☁️ |
| CNAME | www | [yourusername].github.io | Proxied ☁️ |

#### D. Configure GitHub Pages

1. Settings > Pages
2. Custom domain: `braund.ca`
3. Save
4. Wait for DNS check
5. Enable "Enforce HTTPS"

**Done!** Your site will be live at https://braund.ca

### 5. Verify Formspree

Your Formspree form ID is already configured: `maqjjaaw`

1. Test the contact form on your live site
2. Check your email for submissions
3. If you need to modify the form, log in to Formspree

## Content Checklist

Before going live, replace/add:

- [ ] Portfolio items in `_data/portfolio.yml`
- [ ] Portfolio images in `/assets/images/portfolio/`
- [ ] About page bio in `/about/index.html`
- [ ] Delete example blog post (or keep as template)
- [ ] Add your professional photo to `/assets/images/about/` (optional)
- [ ] Update meta description in `_config.yml` if desired
- [ ] Add favicon.png to `/assets/images/` (optional but recommended)

## Tips for Success

### Image Optimisation
- Use Lightroom export: 80-85% quality, 2000px long edge
- Or Preview: Export > Adjust quality slider
- Target: Under 500KB per image

### Writing Blog Posts
1. Write in IA Writer
2. Save as `YYYY-MM-DD-title.md`
3. Add front matter (see example post)
4. Drop in `_posts` folder
5. Commit & push - it's live!

### Making Updates
1. Edit files locally
2. Test: `bundle exec jekyll serve`
3. Commit in GitHub Desktop
4. Push origin
5. Wait ~1 minute - changes are live!

## Common Questions

**Q: Can I change the colours?**  
A: Yes! Edit hex codes in `_sass/_base.scss` under `:root`

**Q: How do I add more blog posts?**  
A: Create new `.md` files in `_posts` with format: `YYYY-MM-DD-title.md`

**Q: Can portfolio items have multiple tags?**  
A: Yes! That's the whole point - tags: [photography, writing, strategy]

**Q: Where do I update my email?**  
A: In `_config.yml` change `email: contact@braund.ca`

**Q: The site isn't updating?**  
A: Wait 1-2 minutes, then hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

**Q: Images aren't showing?**  
A: Check filenames match exactly (case-sensitive) and files are in correct folders

## Need Help?

Full details in `README.md`:
- Complete deployment guide
- Troubleshooting section
- File structure explanation
- Customisation options

---

**You're ready to launch!** 🚀

Start with step 1 (test locally), then work through the checklist at your own pace.
