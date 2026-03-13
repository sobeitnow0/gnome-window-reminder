import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import GLib from 'gi://GLib';

export default class WindowReminderExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._windowTracker = {};
        this._timeoutId = null;

        // Monitora quando o foco muda para resetar o timer da janela ativa
        this._focusSig = global.display.connect('notify::focus-window', () => {
            let win = global.display.get_focus_window();
            if (win) {
                let id = win.get_description();
                this._windowTracker[id] = Date.now();
            }
        });

        // Loop de verificação a cada 60 segundos
        this._startTimer();
    }

    _startTimer() {
        this._timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 60, () => {
            this._checkWindows();
            return GLib.SOURCE_CONTINUE;
        });
    }

    _checkWindows() {
        // Busca o tempo definido pelo usuário (em minutos) e converte para ms
        const idleLimitMinutes = this._settings.get_int('idle-timeout');
        const TIMEOUT_MS = idleLimitMinutes * 60 * 1000;
        
        let now = Date.now();
        let focusedWin = global.display.get_focus_window();

        global.get_window_actors().forEach(actor => {
            let win = actor.meta_window;
            if (!win || win === focusedWin) return;

            let id = win.get_description();
            let lastUsed = this._windowTracker[id] || now;

            if (now - lastUsed >= TIMEOUT_MS) {
                Main.notify("Janela em Background", `"${win.get_title()}" está aberta há ${idleLimitMinutes} min.`);
                // Reseta para não notificar a cada minuto, apenas após outro ciclo
                this._windowTracker[id] = now; 
            }
        });
    }

    disable() {
        if (this._timeoutId) {
            GLib.Source.remove(this._timeoutId);
            this._timeoutId = null;
        }
        if (this._focusSig) {
            global.display.disconnect(this._focusSig);
            this._focusSig = null;
        }
        this._settings = null;
        this._windowTracker = null;
    }
}
