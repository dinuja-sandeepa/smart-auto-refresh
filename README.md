# 🔄 Smart Auto Refresh

Smart Auto Refresh is a lightweight Chrome extension that automatically refreshes the current browser tab at a customizable interval.

It provides fixed and randomized refresh intervals, quick presets, hard refresh support, refresh limits, and simple controls for starting, stopping, and resetting the active refresh timer.

## ✨ Features

* 🔄 **Automatic Page Refresh** — Automatically refresh the current tab at your selected interval.
* ⏱️ **Custom Intervals** — Set refresh intervals in seconds, minutes, or hours.
* 🎲 **Randomized Intervals** — Refresh pages using a random interval instead of a fixed time.
* 🎯 **Custom Random Range** — Define minimum and maximum times for randomized refreshing.
* 🎲 **Fully Random Mode** — Generate random intervals between 1 second and 1 hour.
* ⚡ **Quick Presets** — Quickly select common intervals such as:

  * 5 seconds
  * 30 seconds
  * 1 minute
  * 5 minutes
* 🔥 **Hard Refresh** — Perform a hard refresh to bypass cached page resources.
* ♾️ **Unlimited Refreshes** — Continue refreshing without a predefined limit.
* 🔢 **Limited Refreshes** — Set a specific number of refreshes.
* ▶️ **Start / Stop Controls** — Easily start or stop the active refresh timer.
* 🔄 **Reset Controls** — Reset the current configuration.
* 🌙 **Modern Dark Interface** — Clean and compact dark-themed popup interface.

## 📸 Interface

The extension provides a simple popup interface where you can configure the refresh behavior for the current browser tab.

### Current Tab

Choose your desired refresh interval using:

* Seconds
* Minutes
* Hours

You can also use the quick interval presets.

### Random Refresh

Enable **Randomize Refresh Interval** to use randomized refresh times.

You can configure:

* Minimum refresh time
* Maximum refresh time
* Time units
* Fully Random mode

### Refresh Options

Additional options include:

* Hard Refresh
* Unlimited Refresh Times
* Limited Refresh Times

## 🚀 Installation

### Install from Source

1. Download or clone this repository.

```bash
git clone https://github.com/dinuja-sandeepa/smart-auto-refresh.git
```

2. Open Google Chrome.

3. Navigate to:

```text
chrome://extensions/
```

4. Enable **Developer mode** in the top-right corner.

5. Click **Load unpacked**.

6. Select the project folder containing `manifest.json`.

7. The **Smart Auto Refresh** extension will appear in your Chrome extensions list.

8. Pin the extension to your toolbar for quick access.

### Install from Chrome Web Store

Install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/ndjhpjfhphiclefeoooopmaiohjhonil?utm_source=item-share-cb).

## 🛠️ Usage

1. Open the webpage you want to automatically refresh.
2. Click the **Smart Auto Refresh** extension icon.
3. Select a refresh interval.
4. Optionally enable randomized intervals.
5. Choose whether to use a hard refresh.
6. Select unlimited refreshes or specify a refresh count.
7. Click **Start**.
8. Use **Stop** whenever you want to stop the active refresh timer.
9. Use **Reset** to reset the current configuration.

## 📁 Project Structure

```text
smart-auto-refresh/
│
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
│
├── icons/
│   └── Ghost32.webp
│
└── README.md
```

## 🔧 Technologies

* HTML5
* CSS3
* JavaScript
* Chrome Extensions API

## 🔒 Privacy

Smart Auto Refresh is designed to provide browser tab refresh functionality without requiring unnecessary personal information.

No account or registration is required to use the extension.

## ⚠️ Notes

The extension should only be used on websites where automated refreshing is permitted.

Some websites may restrict or block automated page refreshing. Always follow the terms and conditions of the websites you use.

## 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.

---

**Smart Auto Refresh** — Simple, customizable, and convenient automatic page refreshing for Chrome.
