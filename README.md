<div align="center">
  <img src="https://raw.githubusercontent.com/programmerbeast2004/Asciify/main/src/app/icon.svg" width="120" height="120" alt="Asciify Logo" />
  <h1>Asciify</h1>
  <p><strong>Elevate your GitHub README with beautiful, customizable, and animated ASCII art profile cards.</strong></p>
  
  <h3> Welcome to v2! </h3>
  <p>We've completely refactored Asciify and added massive new features!</p>
</div>

<br />

<div align="center">
  <img src="https://github.com/programmerbeast2004/Asciify/assets/placeholder.gif" alt="Asciify Demo" width="800" />
</div>

<br />

## ✨ Features

- 🎨 **100% SVG & CSS Animations**: No external images, ensuring perfect compatibility with GitHub's strict Markdown Camo proxy.
- ⚡ **Zero Database Needed**: Everything is generated dynamically on the fly via URL parameters.
- 🖼️ **Image to ASCII Magic**: Automatically converts your GitHub avatar (or any custom image URL) into beautiful colored ASCII art.
- ⌨️ **Custom Typing Animations (NEW in v2)**: Create dynamic SVG typing animations for your README. Customize fonts, colors, speeds, and text!
- 📈 **LeetCode Stats Card (NEW in v2)**: Showcase your problem-solving skills with beautifully animated LeetCode profile cards, complete with earned badges and activity graphs.
- 🛠️ **Modular Architecture (NEW in v2)**: Under the hood, Asciify has been fully refactored for better performance, faster renders, and a cleaner developer experience.
- 🕶️ **Live Preview Editor**: Includes a stunning dark-mode GUI to configure your card visually and instantly copy the markdown code.

## 🚀 Usage

Using Asciify is as simple as adding an image tag to your GitHub `README.md`. You don't need to install anything!

### GitHub ASCII Card
```markdown
![Asciify Card](https://<your-vercel-domain>.vercel.app/api/card?username=programmerbeast2004&theme=dark)
```

### LeetCode Stats Card
```markdown
![LeetCode Card](https://<your-vercel-domain>.vercel.app/api/leetcode?username=programmerbeast2004)
```

### Custom Typing Text
```markdown
![Typing Intro](https://<your-vercel-domain>.vercel.app/api/typing?text=Hello+World)
```

*(Note: Replace `<your-vercel-domain>` with your actual deployed Vercel URL, and swap out the username/text!)*

## 🎨 URL Customization Parameters (GitHub Card)

You can append these parameters to the API URL to deeply customize your card:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | *required* | Your GitHub username to fetch stats and avatar. |
| `theme` | string | `dark` | Pre-built color themes: `dark`, `light`, `hacker`, `dracula`, `monokai`. |
| `text_color` | hex | (theme based) | Override the primary text color (e.g., `%23d97706`). |
| `card_font` | string | `monospace` | Try `'Fira Code'`, `'JetBrains Mono'`, or `'Fantasque Sans Mono'`. |
| `avatar_style` | string | `colored` | Options: `colored`, `grayscale`, `sepia`. |
| `border_style`| string | `solid` | Options: `solid`, `dashed`, `dotted`, `none`. |
| `border_color`| string | `default` | Give the border a specific CSS color. |
| `bg_style` | string | `solid` | Options: `solid`, `transparent`, `glass`. |
| `anim_speed` | number | `8` | The duration (in seconds) of the matrix rain animation. |
| `hide_repos` | boolean | `false` | Pass `true` to hide the repository count. (Works for all base fields: `hide_name`, `hide_bio`, etc.) |

### Adding Custom Fields
You can add up to 5 custom key-value pairs (like your Discord tag, Spotify status, or Tech Stack) using `custom_key_X` and `custom_val_X`:

```markdown
?custom_key_1=Discord&custom_val_1=MyUsername%231234&custom_key_2=Stack&custom_val_2=Next.js%20%2B%20Tailwind
```

## 🛠️ Local Development

Want to run the API or the Live Preview editor locally? 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/programmerbeast2004/Asciify.git
   cd Asciify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your GitHub Personal Access Token to avoid API rate limits:
   ```env
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Live Preview editor in action!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
