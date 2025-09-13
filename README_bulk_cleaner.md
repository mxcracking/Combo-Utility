# Bulk File Cleaner 🧹

Ein leistungsstarkes Python-Script für die Verarbeitung und Bereinigung von Textdateien in großen Mengen.

## Features ✨

- **Combo Optimizer** - Vollständige Optimierungspipeline
- **Duplicate Remover** - Entfernt doppelte Zeilen
- **Email Filter** - Filtert E-Mails nach Domain
- **Password Tools** - Filtert Passwörter nach Kriterien
- **Bulk Processing** - Verarbeitet ganze Verzeichnisse
- **Detailed Reports** - Generiert detaillierte Verarbeitungsberichte

## Installation 📦

```bash
# Keine zusätzlichen Abhängigkeiten erforderlich!
# Verwendet nur Python Standard Library
python3 bulk_cleaner.py --help
```

## Verwendung 🚀

### Grundlegende Syntax
```bash
python3 bulk_cleaner.py <input_dir> <output_dir> <operation> [options]
```

### Verfügbare Operationen

#### 1. Combo Optimizer (Empfohlen)
```bash
python3 bulk_cleaner.py input/ output/ combo-optimizer
```
- Entfernt ungültige Kombinationen
- Entfernt Duplikate
- Entfernt leere Zeilen

#### 2. Duplicate Remover
```bash
python3 bulk_cleaner.py input/ output/ remove-duplicates
```

#### 3. Password Optimizer
```bash
python3 bulk_cleaner.py input/ output/ password-optimizer \
  --min-length 8 \
  --require-upper \
  --require-lower \
  --require-number
```

#### 4. Mail Filter
```bash
python3 bulk_cleaner.py input/ output/ mail-filter \
  --domain gmail.com \
  --exact-match
```

#### 5. Remove List
```bash
python3 bulk_cleaner.py input/ output/ remove-list \
  --remove-items "bad@email.com,test@test.com" \
  --exact-remove
```

## Optionen ⚙️

### Allgemeine Optionen
- `--pattern` - Dateimuster (Standard: `*.txt`)
- `--help` - Zeigt Hilfe an

### Password Optimizer Optionen
- `--min-length` - Minimale Passwortlänge
- `--max-length` - Maximale Passwortlänge
- `--require-upper` - Erfordert Großbuchstaben
- `--require-lower` - Erfordert Kleinbuchstaben
- `--require-number` - Erfordert Zahlen
- `--require-symbol` - Erfordert Sonderzeichen

### Mail Filter Optionen
- `--domain` - Domain zum Filtern
- `--exact-match` - Exakte Domain-Übereinstimmung

### Remove List Optionen
- `--remove-items` - Kommagetrennte Liste zu entfernender Items
- `--exact-remove` - Exakte Übereinstimmung

## Beispiele 📝

### Beispiel 1: Große Dateien bereinigen
```bash
# Verarbeite alle .txt Dateien im input/ Verzeichnis
python3 bulk_cleaner.py input/ output/ combo-optimizer --pattern "*.txt"
```

### Beispiel 2: Passwörter filtern
```bash
# Nur starke Passwörter (min. 8 Zeichen, Groß-/Kleinbuchstaben, Zahlen)
python3 bulk_cleaner.py input/ output/ password-optimizer \
  --min-length 8 \
  --require-upper \
  --require-lower \
  --require-number
```

### Beispiel 3: Gmail-Adressen extrahieren
```bash
# Nur Gmail-Adressen
python3 bulk_cleaner.py input/ output/ mail-filter \
  --domain gmail.com \
  --exact-match
```

### Beispiel 4: Spezifische Items entfernen
```bash
# Entferne bestimmte E-Mail-Adressen
python3 bulk_cleaner.py input/ output/ remove-list \
  --remove-items "spam@test.com,fake@demo.com" \
  --exact-remove
```

## Ausgabe 📊

Das Script generiert:
- **Verarbeitete Dateien** im Output-Verzeichnis
- **Detaillierten Bericht** (`processing_report.json`)
- **Konsolen-Output** mit Fortschritt und Statistiken

### Beispiel-Output
```
Processing 5 files...
[1/5] Processing: file1.txt
  ✅ Processed: 1,234 lines (45.2% reduction)
[2/5] Processing: file2.txt
  ✅ Processed: 2,156 lines (32.1% reduction)

📊 Report saved to: output/processing_report.json
📁 Processed files: 5/5
📝 Total lines processed: 15,432
🗑️ Duplicates removed: 3,456
🧹 Empty lines removed: 1,234
```

## Unterstützte Dateiformate 📁

- `.txt` - Textdateien
- `.log` - Log-Dateien
- `.csv` - CSV-Dateien
- `.json` - JSON-Dateien
- `.xml` - XML-Dateien
- `.html` - HTML-Dateien
- `.md` - Markdown-Dateien
- `.js`, `.ts` - JavaScript/TypeScript
- `.py` - Python-Dateien
- `.java`, `.cpp`, `.c`, `.h` - Programmiersprachen
- `.php`, `.rb`, `.go`, `.rs` - Weitere Sprachen
- `.sql` - SQL-Dateien
- `.sh`, `.bat`, `.ps1` - Script-Dateien

## Performance 🚀

- **Unbegrenzte Dateigröße** - Verarbeitet auch sehr große Dateien
- **Speichereffizient** - Verarbeitet Dateien einzeln
- **Parallele Verarbeitung** - Kann mehrere Dateien gleichzeitig verarbeiten
- **Fortschrittsanzeige** - Zeigt Fortschritt für große Verzeichnisse

## Fehlerbehandlung 🛡️

- **Robuste Dateilesung** - Behandelt verschiedene Encodings
- **Detaillierte Fehlermeldungen** - Hilft bei der Problemlösung
- **Fortsetzung bei Fehlern** - Verarbeitet weiter, auch wenn einzelne Dateien fehlschlagen
- **Backup-Empfehlung** - Erstellt Kopien der Originaldateien

## Tipps 💡

1. **Backup erstellen** - Sichere deine Originaldateien
2. **Test mit kleinen Dateien** - Teste zuerst mit wenigen Dateien
3. **Pattern verwenden** - Nutze `--pattern` für spezifische Dateitypen
4. **Berichte prüfen** - Schaue dir die generierten Berichte an
5. **Kombinierte Operationen** - Verwende `combo-optimizer` für beste Ergebnisse

## Lizenz 📄

MIT License - Frei verwendbar für alle Zwecke.

---

**Erstellt für effiziente Textverarbeitung und Datenbereinigung** 🎯
