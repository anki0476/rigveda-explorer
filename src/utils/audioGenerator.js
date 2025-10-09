import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function generateAudioChunks(scriptDialogue) {
  const subscriptionKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const region = import.meta.env.VITE_AZURE_SPEECH_REGION;

  if (!subscriptionKey || !region) {
    throw new Error('Azure credentials missing in .env');
  }

  console.log(`📦 Generating audio - 5 lines per chunk for stability...`);

  const audioUrls = [];
  const BATCH_SIZE = 5; // SMALLER batches = more stable
  
  for (let i = 0; i < scriptDialogue.length; i += BATCH_SIZE) {
    const batch = scriptDialogue.slice(i, i + BATCH_SIZE);
    console.log(`🎙️ Processing lines ${i + 1}-${Math.min(i + BATCH_SIZE, scriptDialogue.length)}...`);
    
    try {
      const audioUrl = await generateSingleBatch(batch, subscriptionKey, region);
      audioUrls.push(audioUrl);
      
      // Longer delay for stability
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Batch failed:`, err);
      throw err;
    }
  }

  console.log(`✅ Generated ${audioUrls.length} audio segments!`);
  return audioUrls;
}

function generateSingleBatch(dialogueLines, subscriptionKey, region) {
  return new Promise((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

    const rishiVoice = "hi-IN-MadhurNeural";
    const seekerVoice = "hi-IN-SwaraNeural";

    let ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">`;

    dialogueLines.forEach((line, index) => {
      const voice = line.speaker === 'rishi' ? rishiVoice : seekerVoice;
      
      // Simple voice tag with text
      ssml += `<voice name="${voice}">${line.text.trim()}</voice>`;
      
      // Add breaks BETWEEN voice tags for turn-taking
      if (index < dialogueLines.length - 1) {
        const nextSpeaker = dialogueLines[index + 1].speaker;
        // Longer break when speaker changes
        const breakTime = (nextSpeaker !== line.speaker) ? "1000ms" : "500ms";
        ssml += `<break time="${breakTime}"/>`;
      }
    });

    ssml += `</speak>`;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    // Set timeout to fail fast if Azure hangs
    const timeout = setTimeout(() => {
      synthesizer.close();
      reject(new Error('Synthesis timeout - Azure TTS took too long'));
    }, 15000); // 15 second timeout

    synthesizer.speakSsmlAsync(
      ssml,
      result => {
        clearTimeout(timeout);
        
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const audioBlob = new Blob([result.audioData], { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          synthesizer.close();
          resolve(audioUrl);
        } else {
          console.error('Synthesis failed:', result.errorDetails);
          synthesizer.close();
          reject(new Error(result.errorDetails || 'Synthesis failed'));
        }
      },
      error => {
        clearTimeout(timeout);
        console.error('Synthesis error:', error);
        synthesizer.close();
        reject(error);
      }
    );
  });
}
