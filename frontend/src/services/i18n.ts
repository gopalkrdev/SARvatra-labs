export type Language = 'en' | 'as' | 'hi';

export interface Translations {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  openDashboard: string;
  exploreMethodology: string;
  activeObservations: string;
  beforeFloodTitle: string;
  afterFloodTitle: string;
  potentialWater: string;
  canopyBounce: string;
  paddyArea: string;
  gridAlignment: string;
  cloudPenetrationTitle: string;
  sitrepButton: string;
  terrainProfileButton: string;
  voiceAlertButton: string;
  voiceAlertPlaying: string;
  askAiPlaceholder: string;
  ndrfActionPlan: string;
  broadcastAudioText: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    tagline: "From Satellite Radar to Ground Reality",
    heroHeadline: "See the Earth Beyond What Eyes Can See.",
    heroSubheadline: "Turning real NASA-ISRO NISAR synthetic aperture radar observations into actionable disaster intelligence.",
    heroDescription: "Floods and water level shifts reshape communities and ecosystems, yet raw microwave radar backscatter is complex to decode. SARvatra Lab computes dual-date radar covariance differences across Sivasagar and the Brahmaputra Basin to reveal what water changes and what Earth reveals.",
    openDashboard: "Open Live Dashboard",
    exploreMethodology: "Explore Methodology",
    activeObservations: "NISAR S-Band Observations Loaded",
    beforeFloodTitle: "IMAGE 1: BEFORE FLOOD (15 JULY 2026)",
    afterFloodTitle: "IMAGE 2: AFTER FLOOD (22 JULY 2026)",
    potentialWater: "Potential Floodwater",
    canopyBounce: "Flooded Canopy Surge",
    paddyArea: "Paddy Lowland Exposure",
    gridAlignment: "Zero Sub-pixel Grid Error",
    cloudPenetrationTitle: "Cloud-Penetration Analysis: Optical vs Radar",
    sitrepButton: "Generate ASDMA / NDRF SitRep",
    terrainProfileButton: "3D Flood Depth & Elevation Profile",
    voiceAlertButton: "🚨 Emergency Audio Warning",
    voiceAlertPlaying: "Broadcasting Emergency Siren...",
    askAiPlaceholder: "Ask SARvatra AI anything about NISAR flood data...",
    ndrfActionPlan: "NDRF Priority Evacuation & Embankment Directives",
    broadcastAudioText: "ATTENTION! PRIORITY ONE EMERGENCY ALERT! THIS IS THE SIVASAGAR DISTRICT DISASTER MANAGEMENT AUTHORITY IN COORDINATION WITH NASA-ISRO NISAR MISSION CONTROL. . . SATELLITE RADAR CONFIRMS SEVERE INUNDATION ALONG THE DIKHOW AND BRAHMAPUTRA RIVERFRONT. . . WATER LEVEL HAS OVERTOPPED CRITICAL EMBANKMENTS. . . OVER TWELVE THOUSAND HECTARES OF LOWLAND SALI PADDIES ARE SUBMERGED UNDER UP TO FIVE METERS OF FLOODWATER. . . ALL RESIDENTS IN DESANGMUKH AND RIPARIAN LOWLANDS ARE DIRECTED TO EVACUATE IMMEDIATELY TO DESIGNATED HIGH-GROUND RELIEF CAMPS AT RANG GHAR AND SIVASAGAR TOWN. . . REPEAT: EVACUATE IMMEDIATELY. . . EMERGENCY NDRF MOTOR RESCUE BOATS ARE DEPLOYED."
  },
  as: {
    tagline: "উপগ্ৰহ ৰাডাৰৰ পৰা বাস্তৱ ভূমিতললৈ",
    heroHeadline: "চকুৰে মনিব নোৱাৰা পৃথিৱীৰ দৃশ্য উন্মোচন।",
    heroSubheadline: "নাছা-ইছৰো নিছাৰ (NISAR) উপগ্ৰহ ৰাডাৰৰ প্ৰকৃত তথ্যক জীৱনৰক্ষী দুৰ্যোগ সতৰ্কতালৈ ৰূপান্তৰ।",
    heroDescription: "বানপানীয়ে অসমৰ জনজীৱন আৰু প্ৰকৃতিক গভীৰভাৱে প্ৰভাৱিত কৰে। ডাঠ ডাৱৰৰ বাবে সাধাৰণ কেমেৰাই বানপানী নেদেখে, কিন্তু নিছাৰ এছ-বেণ্ড মাইক্ৰ'ৱেভ ৰাডাৰে ডাৱৰ ফালি শিৱসাগৰ আৰু ব্ৰহ্মপুত্ৰ উপত্যকাৰ বানপানী আৰু প্লাৱিত খেতিপথাৰ স্পষ্টকৈ দেখুৱাইছে।",
    openDashboard: "লাইভ ডেচব'ৰ্ড খোলক",
    exploreMethodology: "পদ্ধতি আৰু প্ৰযুক্তি চাওক",
    activeObservations: "নিছাৰ এছ-বেণ্ড তথ্য উপলব্ধ",
    beforeFloodTitle: "চিত্ৰ ১: বানৰ পূৰ্বে (১৫ জুলাই ২০২৬)",
    afterFloodTitle: "চিত্ৰ ২: বানপানীৰ সময়ত (২২ জুলাই ২০২৬)",
    potentialWater: "সম্ভাব্য প্লাৱিত অঞ্চল",
    canopyBounce: "জলমগ্ন গছ-বনৰ সংকেত",
    paddyArea: "প্লাৱিত ধাননি পথাৰ",
    gridAlignment: "নিখুঁত উপগ্ৰহ স্থানাংক সংস্থাপন",
    cloudPenetrationTitle: "ডাৱৰ ভেদকৰণ তুলনা: অপটিকেল বনাম ৰাডাৰ",
    sitrepButton: "অসম দুৰ্যোগ ব্যৱস্থাপনা (ASDMA) প্ৰতিবেদন",
    terrainProfileButton: "৩ডি ভূ-উচ্চতা আৰু বানৰ গভীৰতা",
    voiceAlertButton: "🚨 জৰুৰীকালীন অসমীয়া ঘোষণা",
    voiceAlertPlaying: "ৰঙা সতৰ্কবাণী ঘোষণা হৈ আছে...",
    askAiPlaceholder: "নিছাৰ ৰাডাৰ আৰু শিৱসাগৰৰ বান সম্পৰ্কে এআইক প্ৰশ্ন কৰক...",
    ndrfActionPlan: "এন.ডি.আৰ.এফ (NDRF) উদ্ধাৰ আৰু সুৰক্ষা নিৰ্দেশনা",
    broadcastAudioText: "মন কৰক! সৰ্বোচ্চ জৰুৰীকালীন ৰঙা সতৰ্কবাণী! এয়া নাছা-ইছৰো নিছাৰ উপগ্ৰহ মিছন কন্ট্ৰল আৰু অসম দুৰ্যোগ ব্যৱস্থাপনা কৰ্তৃপক্ষৰ যৌথ ঘোষণা! . . উপগ্ৰহ ৰাডাৰ তথ্য অনুসৰি শিৱসাগৰৰ দিচাংমুখ আৰু ব্ৰহ্মপুত্ৰৰ মথাউৰি ভাঙি পানী প্ৰৱেশ কৰিছে! . . বাৰ হাজাৰ হেক্টৰৰো অধিক খেতিপথাৰ প্লাৱিত হৈছে! . . নদীকাষৰীয়া আৰু নিম্নভূমিৰ সকলো ৰাইজ পলম নকৰি তৎক্ষণাৎ ৰংঘৰ আৰু শিৱসাগৰৰ ওখ স্থানৰ আশ্ৰয় শিবিৰলৈ প্ৰস্থান কৰক! . . এনডিআৰএফৰ উদ্ধাৰকাৰী দল সাজু আছে!"
  },
  hi: {
    tagline: "सैटेलाइट रडार से ज़मीनी हकीकत तक",
    heroHeadline: "पृथ्वी को देखें, आंखों की सीमा से परे।",
    heroSubheadline: "नासा-इसरो निसार (NISAR) सैटेलाइट रडार डेटा से आपदा राहत और सटीक बाढ़ निगरानी।",
    heroDescription: "मानसून के घने बादलों के पार सामान्य कैमरे ज़मीन नहीं देख पाते। निसार एस-बैंड रडार माइक्रोवेव किरणों से बादलों को भेदकर शिवसागर और ब्रह्मपुत्र बेसिन में आई बाढ़, डूबे हुए खेत और कटी हुई सड़कों का सटीक वैज्ञानिक मानचित्र प्रस्तुत करता है।",
    openDashboard: "लाइव डैशबोर्ड देखें",
    exploreMethodology: "वैज्ञानिक तकनीक समझें",
    activeObservations: "निसार एस-बैंड डेटा लोड हुआ",
    beforeFloodTitle: "चित्र 1: बाढ़ से पहले (15 जुलाई 2026)",
    afterFloodTitle: "चित्र 2: बाढ़ के चरम पर (22 जुलाई 2026)",
    potentialWater: "संभावित बाढ़ जल क्षेत्र",
    canopyBounce: "जलमग्न वनस्पति बाउंस",
    paddyArea: "प्रभावित धान के खेत",
    gridAlignment: "सटीक भू-स्थानिक अलाइनमेंट",
    cloudPenetrationTitle: "बादल भेदन तुलना: ऑप्टिकल बनाम रडार",
    sitrepButton: "ASDMA / NDRF आपदा स्थिति रिपोर्ट",
    terrainProfileButton: "3D बाढ़ गहराई व स्थलाकृति प्रोफाइल",
    voiceAlertButton: "🚨 आपातकालीन रेड अलर्ट",
    voiceAlertPlaying: "आपातकालीन प्रसारण जारी है...",
    askAiPlaceholder: "निसार सैटेलाइट डेटा और बाढ़ प्रभाव पर सवाल पूछें...",
    ndrfActionPlan: "NDRF प्राथमिकता बचाव व बांध सुरक्षा निर्देश",
    broadcastAudioText: "सावधान! सर्वोच्च प्राथमिकता आपातकालीन रेड अलर्ट! यह नासा-इसरो निसार सैटेलाइट मिशन कंट्रोल और असम आपदा प्रबंधन प्राधिकरण का आधिकारिक प्रसारण है! . . सैटेलाइट रडार पुष्टि करता है कि शिवसागर जिले के दिसांगमुख और ब्रह्मपुत्र नदी का तटबंध टूट चुका है! . . बाढ़ का पानी बारह हज़ार हेक्टेयर से अधिक खेतों और गांवों में घुस गया है! . . निचले इलाकों के सभी नागरिक तुरंत ऊंचे सुरक्षित स्थानों, रंग घर और शिवसागर राहत शिविरों की ओर प्रस्थान करें! . . दोहराते हैं: तुरंत सुरक्षित स्थानों पर पहुंचे! . . एनडीआरएफ की मोटर बोट्स तैनात कर दी गई हैं!"
  }
};

/**
 * Play authentic EAS (Emergency Alert System) dual-frequency siren tone (853 Hz + 960 Hz)
 * and military radio static burst, followed by bold commanding speech synthesis.
 */
export function playEmergencyVoiceAlert(
  lang: Language,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Cancel any ongoing speech
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const audioCtx = new AudioCtx();
      const now = audioCtx.currentTime;

      // 1. EAS DUAL TONE ATTENTION SIREN (853 Hz + 960 Hz)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const sirenGain = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(853, now); // Official EAS frequency 1

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(960, now); // Official EAS frequency 2

      // Volume envelope for the siren (0.9 seconds of pulsed emergency siren)
      sirenGain.gain.setValueAtTime(0.01, now);
      sirenGain.gain.exponentialRampToValueAtTime(0.35, now + 0.05);
      sirenGain.gain.setValueAtTime(0.35, now + 0.4);
      sirenGain.gain.setValueAtTime(0.05, now + 0.48); // pulse gap
      sirenGain.gain.setValueAtTime(0.35, now + 0.55);
      sirenGain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);

      osc1.connect(sirenGain);
      osc2.connect(sirenGain);
      sirenGain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.15);
      osc2.stop(now + 1.15);

      // 2. TACTICAL RADIO SQUELCH / WALKIE-TALKIE BURST
      // Generate noise buffer
      const bufferSize = audioCtx.sampleRate * 0.15;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Filter noise to sound like military radio squelch (bandpass at 1500 Hz)
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1500;
      filter.Q.value = 2.0;

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now + 1.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);

      whiteNoise.start(now + 1.15);
    }
  } catch (e) {
    console.warn("AudioContext tone generation warning:", e);
  }

  // 3. BOLD, AUTHORITATIVE SPEECH SYNTHESIS
  if (!('speechSynthesis' in window)) {
    return false;
  }

  const text = translations[lang].broadcastAudioText;
  const utterance = new SpeechSynthesisUtterance(text);

  // Configure commanding broadcast tone
  utterance.volume = 1.0;     // Full authority volume
  utterance.pitch = 0.84;      // Deep, bold, masculine/commanding authority pitch
  utterance.rate = 0.88;       // Deliberate, clear, emergency broadcast cadence

  // Voice Selection for Maximum Authority
  const allVoices = window.speechSynthesis.getVoices();
  
  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
    const hiVoice = allVoices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
    if (hiVoice) utterance.voice = hiVoice;
  } else if (lang === 'as') {
    utterance.lang = 'as-IN';
    // If Assamese not natively available in browser, use Indian accent voice for regional authenticity
    const inVoice = allVoices.find(v => v.lang.includes('IN') || v.name.toLowerCase().includes('india') || v.lang.includes('bn'));
    if (inVoice) utterance.voice = inVoice;
  } else {
    utterance.lang = 'en-US';
    // Look for authoritative voices: David, Mark, Google US English, Natural
    const boldVoice = allVoices.find(v => 
      v.name.includes('David') ||
      v.name.includes('Mark') ||
      v.name.includes('George') ||
      (v.name.includes('Google') && v.name.includes('US') && !v.name.includes('Female')) ||
      v.name.includes('Natural')
    ) || allVoices.find(v => v.lang.startsWith('en'));

    if (boldVoice) utterance.voice = boldVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  // Delay speech until the EAS siren + radio click finishes (~1.35 seconds)
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 1350);

  return true;
}
