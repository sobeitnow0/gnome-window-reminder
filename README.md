# 🕒 Background Window Reminder (GNOME 50)

[Português](#português) | [English](#english)

---

## English

A GNOME 50 extension designed to prevent "background clutter" and save system resources. It tracks how long windows stay in the background and notifies you if they've been idle for too long (default: 3 minutes).

### ✨ Features
* **Idle Tracking:** Monitors windows that aren't in focus.
* **Customizable Timeframe:** Set your own reminder interval (1-60 mins) via Extension Settings.
* **Performance Friendly:** Low-resource "heartbeat" check.

### 🛠 Installation
1. Clone this repository.
2. Move the folder to the local extensions directory:
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/window-reminder@sobeitnow0
   cp -r * ~/.local/share/gnome-shell/extensions/window-reminder@sobeitnow0/
