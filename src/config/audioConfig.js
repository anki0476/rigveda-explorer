// Cloudinary Audio Configuration with exact URL mapping
const CLOUDINARY_CLOUD_NAME = 'dn35jzjjc';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// Complete URL mapping for all podcast files
const PODCAST_URLS = {
  // English Podcasts
  '1-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311170/Mandala-1-English-Podcast_zlcjkp.m4a',
  '2-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311150/Mandala-2-English-Podcast_pzcpg2.m4a',
  '3-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311050/Mandala-3-English-Podcast_azhwhz.m4a',
  '4-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311147/Mandala-4-English-Podcast_khtm9y.m4a',
  '5-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311147/Mandala-5-English-Podcast_oys3ng.m4a',
  '6-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311160/Mandala-6-English-Podcast_oukuai.m4a',
  '7-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311001/Mandala-7-English-Podcast_ykq40f.m4a',
  '8-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311041/Mandala-8-English-Podcast_sz0u5h.m4a',
  '9-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311124/Mandala-9-English-Podcast_aygjxz.m4a',
  '10-en': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311158/Mandala-10-English-Podcast_mwkskt.m4a',
  
  // Hindi Podcasts
  '1-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310588/Mandala-1-Hindi-Podcast_wn5roq.m4a',
  '2-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310573/Mandala-2-Hindi-Podcast_l7umhb.m4a',
  '3-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310560/Mandala-3-Hindi-Podcast_b2qozm.m4a',
  '4-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310782/Mandala-4-Hindi-Podcast_un5efa.m4a',
  '5-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310803/Mandala-5-Hindi-Podcast_bq1ap7.m4a',
  '6-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310883/Mandala-6-Hindi-Podcast_qmmbhj.m4a',
  '7-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310974/Mandala-7-Hindi-Podcast_y600fb.m4a',
  '8-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761310963/Mandala-8-Hindi-Podcast_pyb0ub.m4a',
  '9-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311117/Mandala-9-Hindi-Podcast_r2ldpc.m4a',
  '10-hi': 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761311147/Mandala-10-Hindi-Podcast_q06fxp.m4a',
};

/**
 * Get podcast URL for specific Mandala and language
 * @param {number} mandalaNumber - Mandala number (1-10)
 * @param {string} language - Language code ('en' or 'hi')
 * @returns {string} Full podcast URL from Cloudinary
 */
export const getPodcastUrl = (mandalaNumber, language) => {
  const key = `${mandalaNumber}-${language}`;
  return PODCAST_URLS[key] || null;
};

// Export configuration constants
export const AUDIO_CONFIG = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  baseUrl: CLOUDINARY_BASE_URL,
  podcasts: PODCAST_URLS,
};

export default {
  getPodcastUrl,
  AUDIO_CONFIG,
};
