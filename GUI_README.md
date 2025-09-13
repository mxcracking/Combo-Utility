# Bulk Cleaner GUI 🎨

Eine benutzerfreundliche grafische Oberfläche für den Bulk File Cleaner mit modernem Design und intuitiver Bedienung.

## 🚀 Schnellstart

### Windows
```bash
python launch_gui.py
```

### Linux/Mac
```bash
python3 launch_gui.py
```

## 📋 Systemanforderungen

- **Python 3.6+** (tkinter ist normalerweise bereits enthalten)
- **Keine zusätzlichen Pakete** erforderlich
- **Mindestens 100MB freier Speicherplatz** für große Dateien

## 🎯 Features der GUI

### 📁 **Einfache Dateiverwaltung**
- **Drag & Drop** kompatible Verzeichnisauswahl
- **Vorschau** der ausgewählten Verzeichnisse
- **Flexible Dateimuster** (.txt, .log, .csv, etc.)

### ⚙️ **12 Verarbeitungsoperationen**
- **Combo Optimizer** - Empfohlene All-in-One Lösung
- **Duplicate Remover** - Entfernt doppelte Zeilen
- **Password Optimizer** - Filtert Passwörter nach Kriterien
- **Mail Filter** - Filtert E-Mails nach Domain
- **Remove List** - Entfernt spezifische Items
- **Und 7 weitere** spezialisierte Operationen

### 🔧 **Erweiterte Optionen**
- **Passwort-Kriterien**: Länge, Groß-/Kleinbuchstaben, Zahlen, Symbole
- **Domain-Filter**: Exakte oder partielle Übereinstimmung
- **Remove-List**: Kommagetrennte Liste zu entfernender Items

### 📊 **Live-Überwachung**
- **Echtzeit-Fortschrittsbalken**
- **Live-Statistiken**: Dateien, Zeilen, Duplikate
- **Detailliertes Log** mit Zeitstempel
- **Fehlerbehandlung** mit klaren Meldungen

### 📈 **Berichte und Auswertung**
- **Automatische Berichte** im JSON-Format
- **Integrierter Report-Viewer**
- **Detaillierte Statistiken** pro Datei
- **Export-Funktionen**

## 🎨 GUI-Übersicht

### Hauptfenster
```
┌─────────────────────────────────────────────────────────┐
│                Bulk File Cleaner 🧹                     │
├─────────────────────────────────────────────────────────┤
│ 📁 Input/Output                                         │
│   Input Directory:  [Browse]                           │
│   Output Directory: [Browse]                           │
│   File Pattern:     [*.txt ▼]                          │
├─────────────────────────────────────────────────────────┤
│ ⚙️ Processing Operation                                 │
│   ○ 🎯 Combo Optimizer (Recommended)                   │
│   ○ ✂️ Capture Remover                                 │
│   ○ 🔍 Remove Duplicates                               │
│   ... (weitere Optionen)                               │
├─────────────────────────────────────────────────────────┤
│ 🔧 Options                                             │
│   [🔐 Password] [📬 Mail Filter] [🗑️ Remove List]     │
├─────────────────────────────────────────────────────────┤
│ 🚀 Start Processing  ⏹️ Stop  📊 View Report  🧹 Clear │
├─────────────────────────────────────────────────────────┤
│ 📊 Progress                                            │
│   [████████████████████████████████████████] 100%      │
│   Status: Processing completed successfully!           │
│   Files: 5/5  Lines: 15,432  Duplicates: 3,456        │
├─────────────────────────────────────────────────────────┤
│ 📝 Processing Log                                      │
│   [10:30:15] Processing: file1.txt                    │
│   [10:30:16] ✅ Processed: 1,234 lines (45.2% reduc..)│
│   [10:30:17] Processing: file2.txt                    │
│   ...                                                   │
└─────────────────────────────────────────────────────────┘
```

## 📖 Bedienungsanleitung

### 1. **Verzeichnisse auswählen**
- Klicke auf **"Browse"** neben Input Directory
- Wähle das Verzeichnis mit deinen Dateien
- Wähle ein Output-Verzeichnis für die verarbeiteten Dateien

### 2. **Operation wählen**
- Wähle eine der 12 verfügbaren Operationen
- **Combo Optimizer** ist für die meisten Fälle empfohlen
- Spezielle Operationen haben zusätzliche Optionen

### 3. **Optionen konfigurieren**
- **Password Optimizer**: Setze Längen- und Zeichenanforderungen
- **Mail Filter**: Gib die Domain zum Filtern ein
- **Remove List**: Liste Items auf, die entfernt werden sollen

### 4. **Verarbeitung starten**
- Klicke auf **"🚀 Start Processing"**
- Überwache den Fortschritt in Echtzeit
- Das Log zeigt Details zu jeder verarbeiteten Datei

### 5. **Ergebnisse prüfen**
- Klicke auf **"📊 View Report"** für detaillierte Statistiken
- Überprüfe die verarbeiteten Dateien im Output-Verzeichnis
- Das Log enthält alle wichtigen Informationen

## 🎯 Anwendungsbeispiele

### Beispiel 1: Combo-Liste optimieren
```
Input: /home/user/combo_lists/
Output: /home/user/cleaned_lists/
Operation: 🎯 Combo Optimizer
Pattern: *.txt
```

### Beispiel 2: Starke Passwörter filtern
```
Input: /home/user/passwords/
Output: /home/user/strong_passwords/
Operation: 🔐 Password Optimizer
Options:
  - Min Length: 8
  - Require Uppercase: ✓
  - Require Lowercase: ✓
  - Require Numbers: ✓
```

### Beispiel 3: Gmail-Adressen extrahieren
```
Input: /home/user/emails/
Output: /home/user/gmail_only/
Operation: 📬 Mail Filter
Options:
  - Domain: gmail.com
  - Exact Match: ✓
```

## 🛠️ Fehlerbehebung

### GUI startet nicht
```bash
# Prüfe Python-Version
python --version

# Prüfe tkinter Installation
python -c "import tkinter; print('tkinter OK')"
```

### Dateien werden nicht gefunden
- Überprüfe das Input-Verzeichnis
- Ändere das Dateimuster (z.B. `*.*` für alle Dateien)
- Stelle sicher, dass Dateien lesbar sind

### Verarbeitung schlägt fehl
- Überprüfe die Dateiberechtigungen
- Stelle sicher, dass genügend Speicherplatz vorhanden ist
- Prüfe das Log für detaillierte Fehlermeldungen

## 📊 Performance-Tipps

1. **Große Dateien**: Das GUI verarbeitet auch GB-große Dateien
2. **Viele Dateien**: Verarbeite große Verzeichnisse in kleineren Batches
3. **Speicher**: Schließe andere Programme bei sehr großen Dateien
4. **Pattern**: Verwende spezifische Dateimuster für bessere Performance

## 🔧 Erweiterte Funktionen

### Batch-Verarbeitung
- Verarbeite mehrere Verzeichnisse nacheinander
- Verwende verschiedene Operationen für verschiedene Dateitypen
- Kombiniere mehrere Filter für optimale Ergebnisse

### Automatisierung
- Speichere Konfigurationen für wiederkehrende Aufgaben
- Verwende das Command-Line-Tool für Skripte
- Integriere in größere Workflows

## 📞 Support

Bei Problemen oder Fragen:
1. Überprüfe das Log für Fehlermeldungen
2. Teste mit kleinen Dateien zuerst
3. Stelle sicher, dass alle Abhängigkeiten vorhanden sind

---

**Viel Spaß beim Verarbeiten deiner Dateien! 🎉**
