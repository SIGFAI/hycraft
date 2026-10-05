// HyCraft (EdwardBelt, IconPippi; MIT): Minecraft Java 1.21.11 clients join a Hytale server. A Hytale server plugin
// runs a Minecraft listener (port 25565) inside the Hytale server and translates both protocols; the Minecraft client
// stays vanilla. Rehosted on SIGFAI/hycraft (standard upstream fusion), the plugin jar unchanged.
//
// What the app installs:
//   minecraft: a vanilla 1.21.11 Prism instance (no loader, no mods) whose server list already holds the local
//              HyCraft listener (overrides/servers.dat, an uncompressed NBT file written below).
//   hytale:    the plugin, as mods/HyCraft-1.1.4.jar in {app}, for the player to copy into their Hytale server
//              folder. No recipe root reaches a Hytale server (it is not the game's install folder and may be on
//              another machine); contract proposal in notes.md.
// The optional HyCraft-Mixins jar needs Hyxin (a separate, unreviewed project): not packaged, named in the notes.
//   node library/hycraft/build.mjs       (outputs: library/lib.mjs)
import { mrpack } from '../../orchestrator/src/recipe.js';
import { instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { asset, card, dl, emit, pinned, rawAt, zipAsset } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/EdwardBelt/HyCraft', tag: 'v1.1.4', commit: '358bb700f9e4b7b2b5690ba661444dae714fc13e',
  license: 'MIT', authors: ['EdwardBelt', 'IconPippi'],
  jar: { file: 'HyCraft-1.1.4.jar', sha256: '1cac5f1936766d92b732e35d240d3c9662788b0438127e483f49ffa7b2dc0a46' }, // = GitHub digest
  hytaleApi: '0.5.2', // gradle.properties hytaleVersion at the tag
};
const MC = { mc: '1.21.11', protocol: 774, java: '21' };
const PORT = 25565;
const ID = 'hycraft', VERSION = '1.1.4', NAME = 'HyCraft';
const TAGLINE = 'Join a Hytale world from Minecraft Java 1.21.11: walk, build, break, fight and trade items in Hytale\'s world with an unmodded Minecraft client.';

// Uncompressed NBT (what Minecraft reads as servers.dat): root compound { servers: [ { name, ip } ] }.
const nbt = {
  str: (s) => { const b = Buffer.from(s, 'utf8'); const n = Buffer.alloc(2); n.writeUInt16BE(b.length); return Buffer.concat([n, b]); },
  tag: (type, name, payload) => Buffer.concat([Buffer.from([type]), nbt.str(name), payload]),
};
function serversDat(servers) {
  const entries = servers.map(s => Buffer.concat([nbt.tag(8, 'name', nbt.str(s.name)), nbt.tag(8, 'ip', nbt.str(s.ip)), Buffer.from([0])]));
  const head = Buffer.alloc(5); head.writeUInt8(10, 0); head.writeInt32BE(entries.length, 1); // list of compounds
  return nbt.tag(10, '', Buffer.concat([nbt.tag(9, 'servers', Buffer.concat([head, ...entries])), Buffer.from([0])]));
}

const jar = await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.jar.file}`, UP.jar.sha256);
const license = await rawAt(UP.repo, UP.commit, 'LICENSE');
const plugin = zipAsset(`${ID}-hytale-server.zip`, [
  { name: `mods/${UP.jar.file}`, data: jar },
  { name: 'HyCraft-LICENSE.txt', data: license },
]);
const pack = asset(`${ID}.mrpack`, mrpack({ name: NAME, summary: TAGLINE, versions: { mc: MC.mc }, versionId: VERSION, jars: [],
  extra: [
    { name: 'overrides/servers.dat', data: serversDat([{ name: 'HyCraft (Hytale server on this PC)', ip: `localhost:${PORT}` }]) },
    { name: `overrides/licenses/${NAME}-LICENSE.txt`, data: license },
  ] }));
const assets = [plugin, pack];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'passthrough',
  games: [
    { game: 'hytale', role: 'host', label: 'Hytale (server)', engine: 'Hytale server + HyCraft plugin (Java 25)', runtime: `Hytale server API ${UP.hytaleApi} (built against); a Hytale update can break it` },
    { game: 'minecraft', role: 'guest', label: 'Minecraft', engine: `Minecraft Java ${MC.mc} (protocol ${MC.protocol}), unmodded`, mc: MC.mc, java: MC.java },
  ],
  requires: [
    { id: 'hytale-server', page: 'https://hytale.com/', note: `a Hytale server you run (with Java 25) or can join; HyCraft goes into its mods/ folder and listens on port ${PORT}` },
    { id: 'minecraft-java', version: MC.mc, page: 'https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc', note: 'a Microsoft account that owns Minecraft: Java Edition (HyCraft checks it with Mojang, online mode)' },
  ],
  install: [
    // For the player to copy into their Hytale server folder (no recipe root reaches it).
    { game: 'hytale', strategy: 'profile', loader: 'hytale-plugin', files: [
      { src: plugin.name, dst: '{app}/hytale-server', unpack: true, contents: plugin.contents, ...dl(plugin, urls) },
    ] },
    { game: 'minecraft', strategy: 'mrpack', pack: { src: pack.name, ...dl(pack, urls) } },
  ],
  launch: [{ game: 'minecraft' }],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: { repo: UP.repo, license: 'MIT', upstream_license: UP.license, tag: UP.tag, commit: UP.commit, hosted: `https://github.com/SIGFAI/${ID}` },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    `You need a Hytale server: one you run yourself (Hytale server files and Java 25) or a friend's that has HyCraft. Your Minecraft side is a plain Minecraft Java ${MC.mc}, no mods.`,
    `Hosting it yourself: copy the mods folder from this mod's hytale-server folder (Open folder in the app) into your Hytale server folder, so you get mods/${UP.jar.file}, then start the server. HyCraft opens a Minecraft port ${PORT} (change it in mods/HyCraft/main.json).`,
    `Press Play: Minecraft ${MC.mc} starts as the app's own Prism instance "${instanceName(`sigf/${ID}`)}" with "HyCraft (Hytale server on this PC)" (localhost:${PORT}) in Multiplayer. For a friend's server, add its address there.`,
    'You sign in with your own Microsoft account: HyCraft checks Minecraft accounts with Mojang (online mode). Minecraft players show up in Hytale with a "." before their name.',
    'Optional, for deeper hooks: the HyCraft-Mixins jar from the upstream release plus Hyxin in the server\'s earlyplugins/ folder (not packaged here).',
    'Restore deletes the Minecraft instance and the plugin copy; take the jar out of your server\'s mods/ folder yourself.',
    'Beta (the author calls it early development): features are incomplete, and a Hytale update can break it until HyCraft is updated. Report bugs to the author on the upstream issue tracker.',
  ],
});

emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
