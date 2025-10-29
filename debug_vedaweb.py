import xml.etree.ElementTree as ET
import re

book_file = r"C:\Users\beatk\Downloads\vedaweb-data-main\vedaweb-data-main\rigveda\TEI\rv_book_01.tei"

print("🔍 Analyzing <lg> elements without type attribute")
print("=" * 60)

tree = ET.parse(book_file)
root = tree.getroot()
ns = {'tei': 'http://www.tei-c.org/ns/1.0'}

hymn = root.find('.//tei:div[@type="hymn"]', ns)

if hymn:
    # Get lg elements without type or with type=None
    lg_elements = [lg for lg in hymn.findall('.//tei:lg', ns) if not lg.get('type')]
    
    print(f"Found {len(lg_elements)} <lg> elements (117 expected)")
    print(f"\nAnalyzing first 15 to find patterns:\n")
    
    for i, lg in enumerate(lg_elements[:15]):
        lg_id = lg.get('{http://www.w3.org/XML/1998/namespace}id', 'no-id')
        
        # Get all text lines
        lines = lg.findall('.//tei:l', ns)
        
        if lines:
            first_text = ''.join(lines[0].itertext()).strip()[:70]
            
            # Try to identify language by content
            has_devanagari = any('\u0900' <= c <= '\u097F' for c in first_text)
            has_latin_diacritics = any(c in 'āīūṛḷṃḥśṣ' for c in first_text)
            
            lang_guess = "?"
            if has_devanagari:
                lang_guess = "Sanskrit (Devanagari)"
            elif has_latin_diacritics:
                lang_guess = "Transliteration (IAST)"
            else:
                lang_guess = "English?"
            
            print(f"{i+1:2d}. ID: {lg_id}")
            print(f"    Lines: {len(lines)}, Language: {lang_guess}")
            print(f"    Text: {first_text}")
            print()

print("=" * 60)
