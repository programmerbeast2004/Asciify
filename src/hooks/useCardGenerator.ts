import { useState, useEffect } from 'react';
import { CardType, ActiveTab, CustomField, HiddenFields, ExportOptions, FormData } from '@/types/generator';

const wrapText = (text: string, maxChars: number) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + word).length > maxChars) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines.length ? lines : [text];
};

export const useCardGenerator = () => {
  const [cardType, setCardType] = useState<CardType>('github');
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({ typing: true, github: true, leetcode: true });
  const [activeTab, setActiveTab] = useState<ActiveTab>('data');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [hiddenFields, setHiddenFields] = useState<HiddenFields>({
    name: false,
    login: false,
    bio: false,
    repos: false,
    followers: false,
    company: false,
    location: false,
  });

  const toggleHidden = (field: string) => setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));

  const [formData, setFormData] = useState<FormData>({
    username: "programmerbeast2004",
    custom_username: "",
    name: "",
    bio: "",
    company: "",
    location: "",
    repos: "",
    followers: "",
    following: "",
    custom_image: "",
    card_font: "'Courier New', monospace",
    text_color: "#d97706",
    theme: "dark",
    border_style: "dashed",
    border_color: "default",
    corner_radius: "15",
    anim_speed: "8",
    bg_style: "solid",
    font_size: "16",
    layout_gap: "normal",
    avatar_style: "colored",
    ascii_density: "standard",
    leetcode_username: "programmer_exe",
    lc_theme: "dark",
    lc_show_badges: true,
    lc_animate_badges: true,
    lc_show_graph: true,
    typing_intro: "Hi there 👋! I am a passionate Full-Stack Developer and Open Source enthusiast. I love building scalable applications, designing beautiful user interfaces, and solving complex problems with code. Welcome to my GitHub profile, where I showcase my latest projects, experiments, and contributions to the developer community!",
    typing_color: "#d97706",
    typing_font: "Courier New",
    typing_size: "24",
    typing_duration: "3000",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (formData.username) params.append("username", formData.username);
      else if (!formData.custom_image) params.append("username", "programmerbeast2004");
      if (formData.custom_image) params.append("custom_image", formData.custom_image);
      if (formData.custom_username) params.append("custom_username", formData.custom_username);
      if (formData.name) params.append("name", formData.name);
      if (formData.bio) params.append("bio", formData.bio);
      if (formData.company) params.append("company", formData.company);
      if (formData.location) params.append("location", formData.location);
      if (formData.repos) params.append("repos", formData.repos);
      if (formData.followers) params.append("followers", formData.followers);
      if (formData.following) params.append("following", formData.following);

      if (hiddenFields.name) params.append("hide_name", "true");
      if (hiddenFields.login) params.append("hide_login", "true");
      if (hiddenFields.bio) params.append("hide_bio", "true");
      if (hiddenFields.repos) params.append("hide_repos", "true");
      if (hiddenFields.followers) params.append("hide_followers", "true");
      if (hiddenFields.company) params.append("hide_company", "true");
      if (hiddenFields.location) params.append("hide_location", "true");
      if (formData.card_font) params.append("card_font", formData.card_font);
      if (formData.text_color) params.append("text_color", formData.text_color);
      
      if (formData.theme !== "dark") params.append("theme", formData.theme);
      if (formData.border_style !== "solid") params.append("border_style", formData.border_style);
      if (formData.border_color !== "default") params.append("border_color", formData.border_color);
      if (formData.corner_radius !== "15") params.append("corner_radius", formData.corner_radius);
      if (formData.anim_speed !== "8") params.append("anim_speed", formData.anim_speed);
      if (formData.bg_style !== "solid") params.append("bg_style", formData.bg_style);
      if (formData.font_size !== "16") params.append("font_size", formData.font_size);
      if (formData.layout_gap !== "normal") params.append("layout_gap", formData.layout_gap);
      if (formData.avatar_style !== "colored") params.append("avatar_style", formData.avatar_style);
      if (formData.ascii_density !== "standard") params.append("ascii_density", formData.ascii_density);

      customFields.forEach((field, i) => {
        if (field.key && field.value) {
          params.append(`custom_key_${i + 1}`, field.key);
          params.append(`custom_val_${i + 1}`, field.value);
        }
      });

      const lcParams = new URLSearchParams();
      if (formData.leetcode_username) lcParams.append("username", formData.leetcode_username);
      else lcParams.append("username", "programmer_exe");
      if (formData.theme !== "dark") lcParams.append("theme", formData.theme);
      if (!formData.lc_show_badges) lcParams.append("show_badges", "false");
      if (!formData.lc_animate_badges) lcParams.append("animate_badges", "false");
      if (!formData.lc_show_graph) lcParams.append("show_graph", "false");
      if (formData.card_font) lcParams.append("font_family", formData.card_font);
      if (formData.text_color) lcParams.append("text_color", formData.text_color);
      if (formData.border_style !== "solid") lcParams.append("border_style", formData.border_style);
      if (formData.border_color !== "default") lcParams.append("border_color", formData.border_color);
      if (formData.corner_radius !== "15") lcParams.append("corner_radius", formData.corner_radius);
      if (formData.bg_style !== "solid") lcParams.append("bg_style", formData.bg_style);
      if (formData.font_size !== "16") lcParams.append("font_size", formData.font_size);

      const gUrl = `/api/card?${params.toString()}`;
      const lUrl = `/api/leetcode?${lcParams.toString()}`;
      setGithubUrl(gUrl);
      setLeetcodeUrl(lUrl);

      const getTypSvgUrl = () => {
        if (!formData.typing_intro.trim()) return "";
        const size = formData.typing_size || "24";
        const maxChars = Math.floor(750 / (parseInt(size) * 0.6));
        const rawLines = formData.typing_intro
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
          .flatMap(line => wrapText(line, maxChars));
        const lines = rawLines.join(';');
        if (!lines) return "";
        const color = (formData.typing_color || '#d97706').replace('#', '');
        const font = encodeURIComponent((formData.typing_font || 'Courier New').replace(/['"]/g, ''));
        const duration = formData.typing_duration || "3000";
        const computedHeight = Math.max(100, rawLines.length * parseInt(size) * 2.5);
        return `https://readme-typing-svg.demolab.com?font=${font}&weight=600&size=${size}&duration=${duration}&pause=1000&color=${color}&center=true&vCenter=true&multiline=true&width=800&height=${Math.round(computedHeight)}&lines=${encodeURIComponent(lines)}`;
      };

      if (cardType === 'github') {
        setPreviewUrl(gUrl);
      } else if (cardType === 'leetcode') {
        setPreviewUrl(lUrl);
      } else {
        setPreviewUrl(getTypSvgUrl());
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formData, customFields, hiddenFields, cardType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const getTypingSvgUrl = () => {
    if (!formData.typing_intro.trim()) return "";
    const size = formData.typing_size || "24";
    const maxChars = Math.floor(750 / (parseInt(size) * 0.6));
    const rawLines = formData.typing_intro
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .flatMap(line => wrapText(line, maxChars));
    const lines = rawLines.join(';');
    if (!lines) return "";
    const color = (formData.typing_color || '#d97706').replace('#', '');
    const font = encodeURIComponent((formData.typing_font || 'Courier New').replace(/['"]/g, ''));
    const duration = formData.typing_duration || "3000";
    const computedHeight = Math.max(100, rawLines.length * parseInt(size) * 2.5);
    return `https://readme-typing-svg.demolab.com?font=${font}&weight=600&size=${size}&duration=${duration}&pause=1000&color=${color}&center=true&vCenter=true&multiline=true&width=800&height=${Math.round(computedHeight)}&lines=${encodeURIComponent(lines)}`;
  };

  const getTypingSvg = () => {
    const url = getTypingSvgUrl();
    if (!url) return "";
    return `<div align="center">\n  <a href="https://git.io/typing-svg"><img src="${url}" alt="Typing SVG" /></a>\n</div>`;
  };

  const getMarkdown = () => {
    if (!mounted || typeof window === "undefined") return "";
    let parts = [];
    if (exportOptions.typing && formData.typing_intro.trim()) {
      parts.push(getTypingSvg());
    }
    if (exportOptions.github) {
      parts.push(`<div align="center">\n  <img src="${window.location.origin}${githubUrl}" alt="Asciify GitHub Stats" />\n</div>`);
    }
    if (exportOptions.leetcode) {
      parts.push(`<div align="center">\n  <img src="${window.location.origin}${leetcodeUrl}" alt="Asciify LeetCode Stats" />\n</div>`);
    }
    return parts.join("\n<br/>\n");
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(getMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const downloadReadme = () => {
    if (!mounted || typeof window === "undefined") return;
    const content = `# Hi there! 👋\n\nWelcome to my GitHub profile. Here are my latest stats generated by **Asciify**:\n\n${getMarkdown()}\n\n---\n*Generated by [Asciify](https://github.com/programmerbeast2004/Asciify)*\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    cardType,
    setCardType,
    copied,
    previewUrl,
    exportOptions,
    setExportOptions,
    activeTab,
    setActiveTab,
    customFields,
    setCustomFields,
    hiddenFields,
    toggleHidden,
    formData,
    handleChange,
    getMarkdown,
    copyMarkdown,
    downloadReadme
  };
};
