import { globalShortcut, IpcMainInvokeEvent } from "electron";

let current: string | null = null;

export function unregister() {
    if (current) {
        globalShortcut.unregister(current);
        current = null;
    }
}

export function register(event: IpcMainInvokeEvent, accelerator: string) {
    unregister();
    const wc = event.sender;

    const ok = globalShortcut.register(accelerator, () => {
        if (wc.isDestroyed()) return;
        wc.executeJavaScript("Vencord.Plugins.plugins.GlobalMute.toggle()");
    });

    if (ok) current = accelerator;
    return ok;
}