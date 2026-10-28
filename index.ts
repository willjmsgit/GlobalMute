import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { findByPropsLazy } from "@webpack";

const AudioActions = findByPropsLazy("toggleSelfMute");
const Native = VencordNative.pluginHelpers.GlobalMute as PluginNative<typeof import("./native")>;

const settings = definePluginSettings({
    hotkey: {
        type: OptionType.STRING,
        description: "Electron accelerator, e.g. Control+Alt+Shift+M or F13",
        default: "Control+Alt+Shift+M",
        restartNeeded: true
    }
});

export default definePlugin({
    name: "GlobalMute",
    description: "System-wide hotkey that toggles Discord mute",
    authors: [{ name: "Will James", id: 210797904007266304n }],
    settings,

    toggle() {
        AudioActions.toggleSelfMute();
    },

    async start() {
        const ok = await Native.register(settings.store.hotkey);
        if (!ok) console.warn("[GlobalMute] could not register", settings.store.hotkey);
    },

    stop() {
        Native.unregister();
    }
});