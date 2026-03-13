import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class WindowReminderPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'Configurações de Tempo' });
        page.add(group);

        const row = new Adw.ActionRow({ 
            title: 'Tempo de Inatividade (Minutos)',
            subtitle: 'Quanto tempo esperar antes de avisar sobre uma janela esquecida.'
        });
        group.add(row);

        const spinButton = new Adw.SpinRow({
            adjustment: new Gio.Adjustment({
                lower: 1,
                upper: 120,
                step_increment: 1,
                page_increment: 10,
                value: this.getSettings().get_int('idle-timeout')
            })
        });

        // Salva automaticamente quando o valor muda
        this.getSettings().bind(
            'idle-timeout',
            spinButton,
            'value',
            Gio.SettingsBindFlags.DEFAULT
        );

        row.add_suffix(spinButton);
        window.add(page);
    }
}
