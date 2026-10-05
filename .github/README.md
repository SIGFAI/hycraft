# HyCraft

Join a Hytale world from Minecraft Java 1.21.11: walk, build, break, fight and trade items in Hytale's world with an unmodded Minecraft client.

**HyCraft is made by [EdwardBelt](https://github.com/EdwardBelt).** All credit for the mod goes to them.

- Original project: https://github.com/EdwardBelt/HyCraft
- Report bugs and ask questions there: https://github.com/EdwardBelt/HyCraft/issues
- Upstream release packaged here: [v1.1.4](https://github.com/EdwardBelt/HyCraft/releases/tag/v1.1.4) (commit [`358bb70`](https://github.com/EdwardBelt/HyCraft/tree/358bb700f9e4b7b2b5690ba661444dae714fc13e))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Hytale (server)**: Hytale server API 0.5.2 (built against); a Hytale update can break it.
- **Minecraft**: Java Edition 1.21.11.
- hytale-server: a Hytale server you run (with Java 25) or can join; HyCraft goes into its mods/ folder and listens on port 25565 (https://hytale.com/).
- minecraft-java 1.21.11: a Microsoft account that owns Minecraft: Java Edition (HyCraft checks it with Mojang, online mode) (https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc).
- Windows and the [SIGF app](https://sigf.ai). The app installs  for you.

## Install

In the SIGF app, open **HyCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.1.4`](../../releases/tag/v1.1.4).

### Good to know

- You need a Hytale server: one you run yourself (Hytale server files and Java 25) or a friend's that has HyCraft. Your Minecraft side is a plain Minecraft Java 1.21.11, no mods.
- Hosting it yourself: copy the mods folder from this mod's hytale-server folder (Open folder in the app) into your Hytale server folder, so you get mods/HyCraft-1.1.4.jar, then start the server. HyCraft opens a Minecraft port 25565 (change it in mods/HyCraft/main.json).
- Press Play: Minecraft 1.21.11 starts as the app's own Prism instance "sigf-hycraft" with "HyCraft (Hytale server on this PC)" (localhost:25565) in Multiplayer. For a friend's server, add its address there.
- You sign in with your own Microsoft account: HyCraft checks Minecraft accounts with Mojang (online mode). Minecraft players show up in Hytale with a "." before their name.
- Optional, for deeper hooks: the HyCraft-Mixins jar from the upstream release plus Hyxin in the server's earlyplugins/ folder (not packaged here).
- Restore deletes the Minecraft instance and the plugin copy; take the jar out of your server's mods/ folder yourself.
- Beta (the author calls it early development): features are incomplete, and a Hytale update can break it until HyCraft is updated. Report bugs to the author on the upstream issue tracker.

## What this repository holds

1. The upstream source tree at tag `v1.1.4`, commit [`358bb700f9e4b7b2b5690ba661444dae714fc13e`](https://github.com/EdwardBelt/HyCraft/tree/358bb700f9e4b7b2b5690ba661444dae714fc13e), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v1.1.4` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `hycraft-hytale-server.zip` | 730481 B | `96819d354834042cea2b2f665f579eee325134da377279fbdce8f77910f04bf4` | upstream's `HyCraft-1.1.4.jar` from release `v1.1.4`, unchanged (sha256 `1cac5f19...0a46`), as `mods/HyCraft-1.1.4.jar`, with upstream's LICENSE; for your Hytale server's `mods/` folder. |
| `hycraft.mrpack` | 1328 B | `65ecd702567b3564470de8098b5b9a99e89a618bf16b84f63d29de4bd84fadf3` | a vanilla Minecraft 1.21.11 instance (no mods) whose server list holds the local HyCraft listener (`localhost:25565`), plus HyCraft's LICENSE. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| HyCraft (all of the upstream tree) | MIT, Copyright EdwardBelt, IconPippi | `LICENSE` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes HyCraft installable in one click, credited to EdwardBelt. If you are the author and want anything changed or taken down, open an issue here.
