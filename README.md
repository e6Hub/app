# Project status
I will discontinue this project since I don't have time for this anymore in my life. Feel free to fork it and modify this software (and please keep the LICENSE and authors intact). You can also use this as a base for a project Vue + Electron but I don't recommend it since some features are deprecated. Support for dtext-parser will stop too since it's part of e6Hub integrity. Translation will stop too, the app will stop including new features and updates (including hotfixes). In case of doubt [contact me](https://saek.work/contact). **This repository will be deleted at December 2021 without exceptions**.

**UPDATE 2022:** This repo won't be deleted but will stay archived.

# e6Hub
[![Build status](https://ci.appveyor.com/api/projects/status/eawhvp0h2215rqhj?svg=true)](https://ci.appveyor.com/project/Saektide/app)
[![DeepScan grade](https://deepscan.io/api/teams/9325/projects/11662/branches/175184/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9325&pid=11662&bid=175184)

* [Download](https://github.com/e6Hub/app/releases/latest)
* [Changelog](https://github.com/e6Hub/app/blob/master/CHANGELOG.md#changelog)

## 🌟 Features
* Fetch, list (save temporally on your session) and download posts and pools
* SWF support (see [FAQ](#-faq) for how to enable it)
* Webm support
* Third party plugins support
* Blur explicit images
* DText support
* i18n support

## 📸 Showcase / Screenshot
<p align="center">
  <img src="assets/screenshots/e6HubShowcase1.gif">
</p>

## 🌎 Translation status
| Language name | Progress | Translated by |
| ------------- | -------: | ------------: |
| English       | 100%     | Saektide      |
| Spanish       | 100%     | Saektide      |

## 🖥 Machine requirements
| Component | Minimum | Recommended |
| --------- | ------: | ----------: |
| RAM       | 2 GB    | 4 GB        |
| Storage   | ~150 MB | 250 MB      |
| CPU       |Any single core CPU | Any dual core CPU |
| Bandwidth Downstream | 1 MiB | 3 MiB |

## 🧪 OS Supported
> **Note** We release only 64 bits versions

| OS Name    | Status | Type |
| ---------- | :----: | ---: |
| Windows 7  |✔<sup>1</sup>     | .exe |
| Windows 8  |✔     | .exe |
| Windows 10 |✔     | .exe |
| Debian     |✔     | .AppImage |
| Fedora     |✔     | .AppImage |
| Arch       |✔     | .AppImage |
| macOS      |⚠     | .dmg |

* ✔ Supported
* ❌ Not supported but can compile it
* ⚠ Not tested yet

1. A clean installation of Windows 7 (w/o recent updates) have the black screen issue. Learn more about [this Electron issue](https://github.com/electron/electron/issues/19569).

## 💾 Development build
### 🚧 Requirements
* Node.js ( v12 or above )
* Git
### 💽 Clone
```
git clone https://github.com/e6Hub/app.git
cd app
```

### 📚 Install deps with NPM
```
npm i
```
or with Yarn
```
yarn
```

## 🛠 Compile
You can now start to write code. Once you done, compile it to make sure if it's work correctly.
```
yarn dev
```
or
```
npm run dev
```

## 📦 Build
It works? Great! now you can build it!
```
yarn build
```
or
```
npm run build
```

## ❓ FAQ

### Can i download multiple pools/posts at the same time?
You can download only one pool at the time. e6Hub will mark posts (and pools) as "pending" to avoid saturate e621's servers.

### Can i see blacklisted posts on this app?
No, e621's global blacklist works on server-side.

### e6Hub have telemetry?
No. And we wont include that feature on our app.

### I want to report a bug or give my feedback, where should i go?
Since the app is discontinued, you cannot report bugs and submit your feedback.

### There's premium functions in this app?
No, all the app (and everything on there) is free and open source.

### How do i enable SWF on this app?
Assuming your machine have Windows (7 or greater), Adobe no longer support Flash right now but you still have the possibility to install it on your machine, since download page isn't available you have to find a file called `pepflashplayer.dll` for 64 bits online*. e6Hub will be able to play SWF posts if you have the proprietary Pepper Flash Player plugin installed and located at `C:\Windows\System32\Macromed\Flash`. If that didn't work, find a Flash Player installer somewhere online then verify if that installer is legit (check the signature).

\* For security reasons, **make sure DLL file have a digital signature** (Right click > Properties > Digital signatures) of "Adobe Inc." or "Adobe Systems Incorporated", must be signed with sha256 algorithm and the issuer should be **DigiCert**.
