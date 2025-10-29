import json
import xml.etree.ElementTree as ET
from pathlib import Path
import re
from collections import defaultdict

def parse_book_file(book_file):
    """Parse a single Mandala book file"""
    print(f"   📖 Parsing {book_file.name}...")
    
    try:
        tree = ET.parse(book_file)
        root = tree.getroot()
        ns = {'tei': 'http://www.tei-c.org/ns/1.0'}
        
        # Extract mandala number
        match = re.search(r'book_(\d+)', book_file.name)
        if not match:
            return []
        mandala = int(match.group(1))
        
        # Find all hymns
        hymns = root.findall('.//tei:div[@type="hymn"]', ns)
        print(f"      Found {len(hymns)} hymns in Mandala {mandala}")
        
        hymns_list = []
        
        for hymn_div in hymns:
            # Extract hymn number from ID (e.g., b01_h001 -> hymn 1)
            hymn_id_attr = hymn_div.get('{http://www.w3.org/XML/1998/namespace}id', '')
            hymn_match = re.search(r'_h(\d+)', hymn_id_attr)
            if not hymn_match:
                continue
            
            sukta = int(hymn_match.group(1))
            hymn_id = f"{mandala}.{sukta}"
            
            # Group verses by verse number
            verses_dict = defaultdict(lambda: {'sanskrit': [], 'transliteration': [], 'translation': []})
            
            # Find all <lg> elements (each represents a verse in different formats)
            lg_elements = [lg for lg in hymn_div.findall('.//tei:lg', ns) if not lg.get('type')]
            
            for lg in lg_elements:
                lg_id = lg.get('{http://www.w3.org/XML/1998/namespace}id', '')
                
                # Extract verse number (e.g., b01_h001_01_zur -> verse 01)
                verse_match = re.search(r'_(\d+)_', lg_id)
                if not verse_match:
                    continue
                
                verse_num = int(verse_match.group(1))
                
                # Determine format based on ID suffix
                if '_eichler' in lg_id:
                    # Sanskrit Devanagari
                    lines = lg.findall('.//tei:l', ns)
                    text = ' '.join(''.join(line.itertext()).strip() for line in lines if line.text)
                    if text:
                        verses_dict[verse_num]['sanskrit'].append(text)
                
                elif '_zur' in lg_id:
                    # Transliteration (IAST)
                    lines = lg.findall('.//tei:l', ns)
                    text = ' '.join(''.join(line.itertext()).strip() for line in lines if line.text)
                    if text:
                        verses_dict[verse_num]['transliteration'].append(text)
                
                elif '_griffith' in lg_id:
                    # English translation (Griffith)
                    lines = lg.findall('.//tei:l', ns)
                    text = ' '.join(''.join(line.itertext()).strip() for line in lines if line.text)
                    if text:
                        verses_dict[verse_num]['translation'].append(text)
            
            # Convert dict to lists in verse order
            if not verses_dict:
                continue
            
            sorted_verses = sorted(verses_dict.items())
            
            hymn_obj = {
                'id': hymn_id,
                'mandala': mandala,
                'sukta': sukta,
                'verses': len(sorted_verses),
                'deity': 'Various',
                'rishi': 'Unknown',
                'meter': 'Various',
                'content': {
                    'sanskrit': [v['sanskrit'][0] if v['sanskrit'] else '' for _, v in sorted_verses],
                    'transliteration': [v['transliteration'][0] if v['transliteration'] else '' for _, v in sorted_verses],
                    'translation': [v['translation'][0] if v['translation'] else '' for _, v in sorted_verses]
                }
            }
            
            hymns_list.append(hymn_obj)
        
        print(f"      ✅ Parsed {len(hymns_list)} hymns")
        return hymns_list
        
    except Exception as e:
        print(f"      ⚠️  Error: {e}")
        import traceback
        traceback.print_exc()
        return []


def parse_all_books(tei_folder):
    """Parse all 10 Mandala books"""
    print(f"📂 Scanning folder: {tei_folder}\n")
    
    tei_path = Path(tei_folder)
    book_files = sorted(tei_path.glob('rv_book_*.tei'))
    
    print(f"📚 Found {len(book_files)} book files\n")
    print("🔍 Parsing all Mandalas...\n")
    
    all_hymns = []
    for book_file in book_files:
        hymns = parse_book_file(book_file)
        all_hymns.extend(hymns)
    
    all_hymns.sort(key=lambda h: (h['mandala'], h['sukta']))
    
    print(f"\n✅ Total hymns parsed: {len(all_hymns)}")
    return all_hymns


def save_to_json(hymns_list, output_file):
    """Save to JSON"""
    total_verses = sum(h['verses'] for h in hymns_list)
    
    output_data = {
        "hymns": hymns_list,
        "metadata": {
            "source": "VedaWeb Project",
            "url": "https://vedaweb.uni-koeln.de",
            "github": "https://github.com/VedaWebProject/vedaweb-data",
            "license": "CC BY-SA 4.0",
            "sanskrit_source": "Eichler",
            "transliteration_source": "Van Nooten & Holland (Zur)",
            "translation_source": "Ralph T.H. Griffith",
            "totalHymns": len(hymns_list),
            "totalVerses": total_verses,
            "generated": "2025-10-29"
        }
    }
    
    print(f"\n📊 Statistics:")
    print(f"   Total Hymns: {len(hymns_list)}")
    print(f"   Total Verses: {total_verses}")
    
    print(f"\n💾 Saving to {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    file_size_mb = Path(output_file).stat().st_size / (1024 * 1024)
    print(f"✅ Saved! File size: {file_size_mb:.2f} MB")
    
    # Sample
    if hymns_list:
        sample = hymns_list[0]
        print(f"\n📖 Sample (Hymn {sample['id']}, Verse 1):")
        if sample['content']['sanskrit']:
            print(f"   Sanskrit: {sample['content']['sanskrit'][0][:60]}...")
        if sample['content']['transliteration']:
            print(f"   Transliteration: {sample['content']['transliteration'][0][:60]}...")
        if sample['content']['translation']:
            print(f"   Translation: {sample['content']['translation'][0][:60]}...")


if __name__ == "__main__":
    print("🕉️  VedaWeb Complete Parser (Sanskrit + Transliteration + Translation)")
    print("=" * 80)
    
    tei_folder = r"C:\Users\beatk\Downloads\vedaweb-data-main\vedaweb-data-main\rigveda\TEI"
    output_file = r"C:\Users\beatk\Project-RV\rigveda-explorer\src\data\hymns_complete.json"
    
    try:
        hymns_list = parse_all_books(tei_folder)
        
        if hymns_list:
            save_to_json(hymns_list, output_file)
            
            print("\n✨ Conversion complete!")
            print(f"\n🎯 Next steps:")
            print(f"   1. Update HymnBrowser.jsx: import hymnsData from '../data/hymns_complete.json'")
            print(f"   2. Update modal to show Sanskrit, transliteration, and translation")
            print(f"   3. Test: npm run dev")
            print(f"   4. Deploy to Vercel!")
        else:
            print("\n❌ No hymns parsed")
            
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
