export default {
  // Meta
  langNativeName: 'Español',
  langNativeCode: 'es',
  langFlag: 'es',
  // Search
  search: {
    posts: {
      search: 'Buscar posts',
      noFetching: 'No hay posts para ver aquí...',
      nothingHere: '¿Eh? ningún post coincide con tus etiquetas.',
      lastPage: '¡Parece que llegaste al final!',
    },
    pools: {
      search: 'Buscar pools',
      noFetching: 'No hay pools para ver aquí...',
      nothingHere: '¿Eh? ningún pool coincide con tus filtros.',
      lastPage: 'No hay más pools aquí'
    },
    submit: 'Buscar',
    loading: 'Cargando...',
  },
  // Blacklist
  blacklist: {
    count: 'Un post está | {count} posts están',
    dueTo: 'ocultos por la política de la lista negra global',
    learnMore: 'Aprende mas sobre esto'
  },
  // PostView
  postview: {
    openOriginal: 'Abrir original',
    description: 'Descripción',
    download: 'Descargar',
    downloadPending: 'Descarga pendiente...',
    downloading: 'Descargando...',
    downloaded: 'Descargado',
    list: 'Añadir a la lista',
    unlist: 'Quitar de la lista',
    details: {
      fileSize: 'Tamaño del archivo',
      artist: 'Artista | Artistas',
      tags: {
        tags: 'Etiquetas',
        general: 'General',
        species: 'Especies',
        characters: 'Personajes',
        copyright: 'Copyright',
        meta: 'Meta'
      }
    }
  },
  // PoolView
  poolview: {
    download: 'Descargar pool',
    downloading: 'Descargando pool... {progress}%',
    downloaded: 'Descargado',
    nothingHere: 'Este pool está vacío... ¿o no?'
  },
  // Downloads
  downloads: {
    downloads: 'Descargas',
    posts: 'Posts',
    pools: 'Pools',
    nothingYet: 'No se realizaron descargas en esta sesión...',
    wannaTry: '¿quieres intentarlo?',
    downloadList: 'Descargar post listado | Descargar {count} posts listados',
  },
  // Settings
  settings: {
    settings: 'Ajustes',
    sidebar: {
      appSettings: 'Ajustes de la app',
      downloads: 'Descargas',
      search: 'Búsqueda',
      appearance: 'Apariencia',
      plugins: 'Extensiones',
      language: 'Idioma',
      about: 'Acerca de'
    },
    downloads: {
      title: 'Descargas',
      currentDownloadsDir: 'Carpeta actual de descargas',
      manageDir: 'Administrar carpeta'
    },
    search: {
      title: 'Búsqueda',
      searchMode: 'Modo de búsqueda',
      mode: {
        safe: 'Seguro (e926)',
        unsafe: 'Inseguro (e621)'
      }
    },
    appearance: {
      title: 'Apariencia',
      titlebarStyle: 'Estilo de la barra de título',
      titlebar: {
        windows10: 'Windows 10 (por defecto)',
        small: 'Pequeño'
      },
      postviews: 'Vistas de posts',
      blurNsfwPosts: 'Desenfocar posts explicitos',
      unblurWhen: 'Enfocar cuando',
      unblur: {
        onhover: 'Al poner el cursor por encima',
        onpostview: 'En la vista previa del post',
        never: 'Nunca'
      },
      searchviewMode: 'Modo de vista de la búsqueda',
      searchview: {
        classic: 'Vista clásica',
        compact: 'Vista compacta, todos los posts tienen la misma altura y anchura'
      }
    },
    plugins: {
      title: 'Extensiones',
      openDir: 'Abrir carpeta de extensiones',
      refresh: 'Recargar plugins',
      enable: 'Activar',
      disable: 'Desactivar',
      by: 'por'
    },
    languages: {
      title: 'Idioma',
      availableLangs: 'Idiomas disponibles'
    },
    about: {
      title: 'Acerca de',
      aboutTitle: 'e6Hub no es una aplicación oficial de e621.net',
      aboutBody: 'Esta app fue creada por usuarios de e621.net, no por el staff de e621. Si quieres repotar un error o dar tus comentarios puedes ir a {0}. Esta aplicación no provee ninguna garantía ya que es de código abierto. El proyecto fue creado por {1} y está bajo la {2}.',
      aboutIssues: 'Conflictos',
      aboutLicense: 'Licencia MIT',
      restartToUpdate: 'Reiniciar para actualizar',
      downloadingUpdate: 'Descargando',
      checkForUpdate: 'Comprobar actualizaciones',
      checkingForUpdate: 'Comprobando actualizaciones...',
      devBuild: 'Compilación de desarrollo',
      unsupportedBuild: 'Compilación sin soporte',
      resetSettings: 'Restablecer ajustes',
      versionDetail: 'e6Hub {0}, ejecutando en {1} ({2}/{3})'
    }
  },
  // Other
  betaWarn: 'Esta característica es experimental y posiblemente no sea 100% funcional, las sugerencias son bienvenidas en la página de {0}.'
}