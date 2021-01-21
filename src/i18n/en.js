export default {
  // Meta
  langNativeName: 'English',
  langNativeCode: 'en',
  langFlag: 'us',
  // Search
  search: {
    posts: {
      search: 'Search posts',
      noFetching: 'No posts to see here...',
      nothingHere: 'Oh? no posts that matches with your tags',
      lastPage: 'Seems you reached to the end!',
    },
    pools: {
      search: 'Search pools',
      noFetching: 'No pools to see here...',
      nothingHere: 'Oh? no pools that matches with your filters',
      lastPage: 'No more pools here'
    },
    submit: 'Search',
    loading: 'Loading...',
  },
  // Blacklist
  blacklist: {
    count: 'One post is | {count} posts are',
    dueTo: 'hidden due to global blacklist rule.',
    learnMore: 'Learn more about this'
  },
  // PostView
  postview: {
    openOriginal: 'Open original',
    description: 'Description',
    download: 'Download',
    downloadPending: 'Pending download...',
    downloading: 'Downloading...',
    downloaded: 'Downloaded',
    list: 'Add to list',
    unlist: 'Remove from list',
    details: {
      fileSize: 'File size',
      artist: 'Artist | Artists',
      tags: {
        tags: 'Tags',
        general: 'General',
        species: 'Species',
        characters: 'Characters',
        copyright: 'Copyright',
        meta: 'Meta'
      }
    }
  },
  // PoolView
  poolview: {
    download: 'Download pool',
    downloading: 'Downloading pool... {progress}%',
    downloaded: 'Downloaded',
    nothingHere: 'This pool is empty... or not?'
  },
  // Downloads
  downloads: {
    downloads: 'Downloads',
    posts: 'Posts',
    pools: 'Pools',
    nothingYet: 'No downloads found in this session...',
    wannaTry: 'wanna try?',
    downloadList: 'Download listed post | Download {count} listed posts',
  },
  // Settings
  settings: {
    settings: 'Settings',
    sidebar: {
      appSettings: 'App settings',
      downloads: 'Downloads',
      search: 'Search',
      appearance: 'Appearance',
      plugins: 'Plugins',
      language: 'Language',
      about: 'About'
    },
    downloads: {
      title: 'Downloads',
      currentDownloadsDir: 'Current download folder',
      manageDir: 'Manage folder'
    },
    search: {
      title: 'Search',
      searchMode: 'Search mode',
      mode: {
        safe: 'Safe (e926)',
        unsafe: 'Unsafe (e621)'
      }
    },
    appearance: {
      title: 'Appearance',
      titlebarStyle: 'Titlebar style',
      titlebar: {
        windows10: 'Windows 10 (Default)',
        small: 'Small'
      },
      postviews: 'Post Views',
      blurNsfwPosts: 'Blur explicit posts',
      unblurWhen: 'Unblur when',
      unblur: {
        onhover: 'On hover',
        onpostview: 'On post\'s view',
        never: 'Never'
      },
      searchviewMode: 'Search view mode',
      searchview: {
        classic: 'Classic view',
        compact: 'Compact view, all posts have the same height and width'
      }
    },
    plugins: {
      title: 'Plugins',
      openDir: 'Open plugins folder',
      refresh: 'Refresh plugins',
      enable: 'Enable',
      disable: 'Disable',
      by: 'by'
    },
    languages: {
      title: 'Language',
      availableLangs: 'Available languages'
    },
    about: {
      title: 'About',
      aboutTitle: 'e6Hub isn\'t an official app of e621.net',
      aboutBody: 'This app was created by users, not by e621\'s staff. If you want to report bug or give your feedback go to {0}. This app doesn\'t provide any warranty since it\'s open source. The author of the project is {1}  and it\'s licensed under {2}.',
      aboutIssues: 'Issues',
      aboutLicense: 'MIT license',
      restartToUpdate: 'Restart to update',
      downloadingUpdate: 'Downloading',
      checkForUpdate: 'Check for updates',
      checkingForUpdate: 'Checking for updates...',
      devBuild: 'Development build',
      unsupportedBuild: 'Unsupported build',
      resetSettings: 'Reset settings',
      versionDetail: 'e6Hub {0}, running on {1} ({2}/{3})'
    }
  },
  // Other
  betaWarn: 'This feature is experimental and may not be 100% functional, feedbacks are welcome at {0} page.'
}