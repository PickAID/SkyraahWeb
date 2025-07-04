# Archived Directory: _root

**Archive Date**: 2025-06-16T15:25:24.513Z
**Original Location**: _root/_root
**Reason**: Physical directory no longer exists in docs structure

## Contents
This archive contains both the configuration files and metadata for a directory that was removed from the physical docs structure.

- `config/` - Contains the JSON configuration files (locales.json, order.json, etc.)
- `metadata/` - Contains the metadata files tracking configuration history

## Restoration
To restore this directory:

1. **Recreate the physical directory**: 
   `mkdir -p docs//_root/_root/`

2. **Restore configuration files**:
   `cp -r config/_root/ .vitepress/config/sidebar//_root/_root/`

3. **Restore metadata files**:
   `cp -r metadata/_root/ .vitepress/config/sidebar/.metadata//_root/_root/`

4. **Restart the development server**

## Archive Structure
```
_root_removed_2025-06-16/
├── README.md (this file)
├── config/_root/     # Original config files
└── metadata/_root/   # Original metadata files
```
