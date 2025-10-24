import json
import os

# Process all mandala transcript files
for i in range(1, 11):
    input_file = f'mandala_{i}_en.json'
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check if data is a list (array) or dict
        if isinstance(data, list):
            # It's an array of segments
            full_text = []
            for segment in data:
                if isinstance(segment, dict) and 'text' in segment:
                    full_text.append(segment['text'].strip())
            
            # Join all text into one continuous transcript
            transcript_text = ' '.join(full_text)
        elif isinstance(data, dict):
            # It's already a dict, extract text differently
            transcript_text = str(data.get('text', ''))
        else:
            transcript_text = "Transcript not available."
        
        # Create simple output structure
        output = {
            "description": f"Deep dive into Mandala {i} of the Rigveda, exploring its themes, philosophy, and historical significance.",
            "transcript": transcript_text
        }
        
        # Save transformed file
        with open(input_file, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Transformed {input_file} ({len(transcript_text)} characters)")
    except Exception as e:
        print(f"❌ Error with {input_file}: {e}")

print("🎉 All files transformed!")
