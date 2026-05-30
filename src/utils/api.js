// ─── Pollinations.ai ───────────────────────────────────────────────────────
// Completely FREE · No API key · No CORS · Instant generation
// Docs: https://image.pollinations.ai/

// Aspect ratio → pixel dimensions
const ASPECT_SIZES = {
  '1:1':  { width: 512,  height: 512  },
  '16:9': { width: 768,  height: 432  },
  '9:16': { width: 432,  height: 768  },
  '4:3':  { width: 640,  height: 480  },
};

// Lighting style → prompt modifier
const LIGHTING_MODIFIERS = {
  neon:        'neon lit, vibrant neon glow, cyberpunk lighting, colorful neons',
  cinematic:   'cinematic lighting, dramatic shadows, film noir, volumetric light',
  holographic: 'holographic, iridescent, prismatic light, translucent glow',
  studio:      'studio lighting, professional photography, clean white light',
  golden:      'golden hour, warm sunlight, soft glow, backlit',
  dark:        'moody dark lighting, chiaroscuro, dark atmosphere',
};

// Style presets → prompt modifiers
const STYLE_MODIFIERS = {
  cyberpunk:   'cyberpunk aesthetic, neon city, futuristic dystopia, high tech, blade runner style',
  corporate:   'corporate modern design, clean professional, minimalist business aesthetic',
  futuristic:  'sci-fi futuristic, advanced technology, space age design',
  minimal:     'minimalist design, clean lines, simple elegant composition',
  synthwave:   'synthwave retro-futuristic, retrowave, 80s neon aesthetic',
  glitch:      'glitch art, digital distortion, pixel corruption, cyberpunk glitch',
};

/**
 * Build the final positive prompt by combining all modifiers
 */
export function buildPrompt({ prompt, lighting, style, negative }) {
  const parts = [prompt.trim()];
  if (lighting && LIGHTING_MODIFIERS[lighting]) parts.push(LIGHTING_MODIFIERS[lighting]);
  if (style    && STYLE_MODIFIERS[style])    parts.push(STYLE_MODIFIERS[style]);
  parts.push('high quality, detailed, sharp focus, 8k uhd');
  return {
    positive: parts.join(', '),
    negative: negative
      ? `${negative}, blurry, low quality, watermark`
      : 'blurry, low quality, bad anatomy, watermark, ugly, deformed',
  };
}

/**
 * Generate image using Pollinations.ai (gen.pollinations.ai endpoint)
 * Returns { url: string (direct image URL), model: string }
 *
 * Free models: flux (Schnell/fast), zimage (turbo + upscale), klein (FLUX.2 4B)
 */
export async function generateImage({ prompt, lighting, style, negative, aspectRatio = '1:1' }) {
  const { positive, negative: builtNegative } = buildPrompt({ prompt, lighting, style, negative });
  const size  = ASPECT_SIZES[aspectRatio] || ASPECT_SIZES['1:1'];
  const seed  = Math.floor(Math.random() * 999999);

  // Build Pollinations URL — returns the image directly at this URL
  const params = new URLSearchParams({
    width:   size.width,
    height:  size.height,
    seed,
    model:   'flux',      // Flux Schnell — fast & free; alternatives: zimage, klein
    nologo:  'true',
    enhance: 'false',
    negative_prompt: builtNegative,
    nofeed:  'true',      // don't publish to public feed
    _t:      Date.now(),  // cache-buster: forces fresh generation every request
  });

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(positive)}?${params}`;

  // Return the URL directly — <img src> loads it without CORS restrictions.
  // (fetch() triggers CORS and gets blocked; img src does not.)
  return { url: imageUrl, model: 'flux-schnell (pollinations)' };
}

/**
 * Download image — opens in a new tab for cross-origin Pollinations URLs.
 * The user can then right-click → Save Image, or we use canvas to force download.
 */
export async function downloadImage(url, filename = 'ai-generated.png') {
  try {
    // Try canvas approach: draw the image and export as blob
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now();
    });
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth  || 512;
    canvas.height = img.naturalHeight || 512;
    canvas.getContext('2d').drawImage(img, 0, 0);
    canvas.toBlob(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    }, 'image/png');
  } catch {
    // Fallback: open in new tab so user can save manually
    window.open(url, '_blank');
  }
}
