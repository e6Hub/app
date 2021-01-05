# Contribute to e6Hub
Thanks you for your interest in contributing to e6Hub (formerly E6-Downloader), if you want only download and use the app please go to [Releases](https://github.com/e6Hub/app/releases) page. In case you want to contribute please take a moment to read this document **before** submitting any pull request. If you only want to provide your feedback please use the [Issues](https://github.com/e6Hub/app/issues) page.

## Our stack, how e6Hub works
e6Hub works thanks to [Electron](https://www.electronjs.org/) and [Vue](https://vuejs.org/), for network requests we use [request](https://github.com/request/request), [request-progress](https://github.com/IndigoUnited/node-request-progress) and [request-promise-native](https://github.com/request/request-promise-native). We may change the `request` module due to deprecation but requests to e621's API still works fine in-app. For store things we use [Vuex](https://vuex.vuejs.org/) with the [vuex-persist plugin](https://github.com/championswimmer/vuex-persist). For user interface (UI) [Tailwind CSS](https://tailwindcss.com/) is used in this project.

## Pull requests (aka PRs)
If you plan to work on significant features please ask before on [Issues](https://github.com/e6Hub/app/issues) to discuss about your idea and why is necessary in the app. If you don't want to make a pull request you can make a third-party plugin for the app, keep in mind that feature still experimental. For more information about pull requests on GitHub check out [this help page](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

## Translate
Want to change or translate something on e6Hub? Here's some steps to guide you about how to do that...

1. Fork this repo.
2. Find and navigate to the langs folder, it's `/src/i18n/`.
3. Create a JS file with the lang code (ISO 639-1) that you desire to translate, for example if you want to translate German, the lang code for that is `de`, so the name of that file should be `de.js`. [Here's a list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of all ISO lang codes if you need it.
4. Copy all the contents of `en.js` to your translation file, then make all the desire changes*
5. Once you finish with your translation make a Pull Request (go to [compare](https://github.com/e6Hub/app/compare)) then select your forked repo. Review all changes before you create the pull request.
6. If all is OK, click on **Create pull request**. Change the title to **i18n for [lang code goes here]**.

\* Please DO NOT translate object keys, only translate the value of them:

```js
// en.js 
  checkForUpdate: 'Check for updates',
// es.js
  checkForUpdate: 'Comprobar actualizaciones',
```

## Coding standards
e6Hub app's code follow standards without ESLint, this is because we don't want to waste our time in unnecessary rules. We want to be more human and flexible, here's some standards that we usually follow:
* Use 2 **spaces** for code indent.
* Code must be commented, see [JSDoc reference](https://jsdoc.app/index.html).
* Vue components are optionally commented.

## Testing app
When you're running e6Hub in development environment probably you see the "updater error" that requires a `yml` file, ignore that if you don't want to test Updater feature. You can help yourself with the DevTools window, it'll open if you're running on a dev environment. If you tested all and everything seems correct please build the app with the build command (`npm run build` or `yarn build`) may take a while, so you will have time to make other activities.

Once tested all you can submit your pull request with your changes.
