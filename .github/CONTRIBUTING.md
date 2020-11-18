# Contribute to e6Hub
Thanks you for your interest in contributing to e6Hub (formerly E6-Downloader), if you want only download and use the app please go to [Releases](https://github.com/e6Hub/app/releases) page. In case you want to contribute please take a moment to read this document **before** submitting any pull request. If you only want to provide your feedback please use the [Issues](https://github.com/e6Hub/app/issues) page.

## Our stack, how e6Hub works
e6Hub works thanks to [Electron](https://www.electronjs.org/) and [Vue](https://vuejs.org/), for network requests we use [request](https://github.com/request/request), [request-progress](https://github.com/IndigoUnited/node-request-progress) and [request-promise-native](https://github.com/request/request-promise-native). We may change the `request` module due to deprecation but requests to e621's API still works fine in-app. For store things we use [Vuex](https://vuex.vuejs.org/) with the [vuex-persist plugin](https://github.com/championswimmer/vuex-persist). For user interface (UI) [Tailwind CSS](https://tailwindcss.com/) is used in this project.

## Pull requests (aka PRs)
If you plan to work on significant features please ask before on [Issues](https://github.com/e6Hub/app/issues) to discuss about your idea and why is neccesary in the app. If you don't want to make a pull request you can make a third-party plugin for the app, keep in mind that feature still experimental.

## Coding standards
e6Hub app's code follow standards without ESLint, this is because we don't want to waste our time in unneccesary rules. We want to be more human and flexible, here's some standards that we usually follow:
* Use 2 **spaces** for code indent.
* Code must be commented, see [JSDoc reference](https://jsdoc.app/index.html).
* Vue components are optionally commented.

## Testing app
When you're running e6Hub in development environment probably you see the "updater error" that requires a `yml` file, ignore that if you don't want to test Updater feature. You can help yourself with the DevTools window, it'll open if you're running on a dev environment. If you tested all and everything seems correct please build the app with the build command (`npm run build` or `yarn build`) may take a while, so you will have time to make other activities.

Once tested all you can submit your pull request with your changes.
