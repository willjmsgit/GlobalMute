# GlobalMute

Equicord/Equibop plugin that adds a system-wide hotkey to toggle Discord mute.

## Install
Userplugins are compiled into the client, so this needs a source build:
1. Clone Equicord and run `pnpm install`
2. Put these files in `src/userplugins/GlobalMute/` (exact capitalisation)
3. Run `pnpm build`
4. In Equibop's Developer Settings, set Equicord Location to the `dist` folder
5. Restart Equibop and enable GlobalMute. Set the hotkey in its settings.

Hotkey format is an Electron accelerator, e.g. `End` or `Control+Alt+Shift+M`.