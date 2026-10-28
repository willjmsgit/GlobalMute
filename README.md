# GlobalMute

A plugin for [Equicord](https://github.com/Equicord/Equicord) that adds a **system-wide hotkey to toggle your Discord mute**, so it works while a game or another app is focused.

It uses Discord's own mute, so the mute icon updates and other people in the call hear you muted. It does not touch your system microphone, so a game with proximity voice chat keeps hearing you.

## Why this exists

Equibop, Vesktop and similar clients are Electron apps, and Discord's built-in keybinds only fire while the window is focused. GlobalMute registers a real global shortcut from the Electron main process and tells Discord to toggle mute when it fires.

## Requirements

- Equibop (tested on Windows 11)
- Git, Node.js and pnpm
- A source build of Equicord. Userplugins are compiled into the client, so this can't be dropped into a prebuilt copy.

## Install

1. Clone Equicord and install its dependencies:
   ```
   git clone https://github.com/Equicord/Equicord
   cd Equicord
   pnpm install
   ```
2. Copy `index.ts` and `native.ts` into `src/userplugins/GlobalMute/`. Keep the capitalisation exactly as `GlobalMute`.
3. Build:
   ```
   pnpm build
   ```
4. In Equibop's settings, open **Developer Settings** and set **Equicord Location** to the `dist` folder (not `dist/equibop`, which Equibop adds itself).
5. Fully quit Equibop from the tray and reopen it.
6. Enable **GlobalMute** in the plugin list, set your hotkey, and restart once more.

You will need to rebuild after every Equicord update.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| Hotkey | `Control+Alt+Shift+M` | An [Electron accelerator](https://www.electronjs.org/docs/latest/api/accelerator), for example `End`, `F13` or `Control+Shift+M`. Restart required. |

## Limitations

- **Toggle only.** Electron can't detect key release, so there's no push-to-talk.
- **The hotkey is captured system-wide.** While the plugin is running, no other app receives that key. Prefer a combination or a key you don't otherwise use.
- **No mouse buttons.** Electron global shortcuts are keyboard only. A tool such as AutoHotkey can remap a mouse button to your hotkey.
- **Depends on Discord internals.** It calls Discord's `toggleSelfMute`, which may be renamed in a Discord update.
- Only tested on Windows 11 with Equibop.

## Troubleshooting

- **Plugin not in the list:** Equibop is still using its bundled Equicord. Check the Equicord Location and fully quit from the tray.
- **Hotkey does nothing:** open the dev console (Ctrl+Shift+I) and look for `[GlobalMute] could not register`. Another app owns that key, so choose a different one.
- **Hotkey fires but mute doesn't change:** the `toggleSelfMute` module lookup has probably broken. Open an issue.

## AI disclosure

This plugin's code was written with the help of an AI assistant (Claude, by Anthropic). I built it, tested it and debugged it myself on my own setup, but it hasn't had a formal review. Read the code before you build it, as you should with any plugin that runs in the main process.

## License

GPL-3.0, matching Equicord. See [LICENSE](LICENSE).
