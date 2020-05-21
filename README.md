# e6Hub
[![Build status](https://ci.appveyor.com/api/projects/status/eawhvp0h2215rqhj?svg=true)](https://ci.appveyor.com/project/Saektide/app)
[![DeepScan grade](https://deepscan.io/api/teams/9325/projects/11662/branches/175184/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9325&pid=11662&bid=175184)

This is an app for explore and download posts on e621.net. It uses e621's API and it's powered by Vue.js. Feel free to contribute to this project!

* [Download](https://github.com/e6Hub/app/releases/latest)

### 💭 Keep in mind...
* This app interacts with a NSFW site, so, if you don't like to see explicit content... use `rating:s` while you are searching posts.
* Posts (images, animations, videos) are from e621, some are uploaded by his own artist.

## 🖥 Machine requirements
| Component | Minimum | Recommended |
| --- | ---: | ---: |
| RAM | 2 GB | 4 GB |
| Storage | ~150 MB | 250 MB |
| CPU | 1.80 Ghz - Single Core (Intel Celeron) | 3.00 Ghz - Dual Core (AMD Athlon x2) |
| Bandwidth Downstream | 1 MiB | 3 MiB |

## 🧪 OS Supported
> **Note** We release only 64bit versions

| OS Name    | Status | Type |
| ---------- | :----: | ---: |
| Windows 7  |:heavy_exclamation_mark:     | .exe |
| Windows 8  |✔     | .exe |
| Windows 10 |✔     | .exe |
| Debian     |❌     | .deb |
| Fedora     |❌     | .rpm |
| Arch       |❌     | .tar |
| macOS      |⚠     | .dmg |

* ✔ Supported
* ❌ Not supported but it can be build
* ✖ Unstable
* ⚠ Not tested yet
* :heavy_exclamation_mark: Unstable since some version of Electron (mostly Electron 6 or 8)


## 💾 Install
### 💽 Clone
```
git clone https://github.com/e6Hub/app.git
cd app
```

### 📚 Install deps with Yarn (recommended)
```
yarn
```
or with NPM...
```
npm install
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

## ⚠ Any issue or feedback?
You can tell it at [Issues](https://github.com/e6Hub/app/issues).
