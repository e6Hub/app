# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/e6Hub/app/compare/v3.7.0...HEAD)

## [3.7.0](https://github.com/e6Hub/app/compare/v3.6.1...v3.7.0) - 2021-01-21

### Added
- Add internationalization (i18n). Check [CONTRIBUTING.md](https://github.com/e6Hub/app/blob/master/.github/CONTRIBUTING.md) for more information about this ([96ed215](https://github.com/e6Hub/app/commit/96ed2150e7d2eb5c1ed5de245d7429be2114a212))
  - Added English
  - Added Spanish (Español)
- Add safe mode (e926) and enabled by default, you can disable this on **Search** settings ([5b7ec48](https://github.com/e6Hub/app/commit/5b7ec48065626cc32f6f65590cfa21d4146ddb17))
- Add support to Linux using AppImage ([44d0cd0](https://github.com/e6Hub/app/commit/44d0cd0a8297d5df1535d73c8c5855484fe43acb))

### Removed

- Removed external link component (which is deprecated) ([5b7ec48](https://github.com/e6Hub/app/commit/5b7ec48065626cc32f6f65590cfa21d4146ddb17))

### Fixed
- Fix for development environments an issue with openExternal handle, it won't open `localhost` domains on your browser anymore ([96ed215](https://github.com/e6Hub/app/commit/96ed2150e7d2eb5c1ed5de245d7429be2114a212))

## [3.6.1](https://github.com/e6Hub/app/compare/v3.6.0...v3.6.1) - 2020-12-25

### Removed

- Links in posts descriptions will no longer receive an ID ([7b39565](https://github.com/e6Hub/app/commit/7b39565cb0624b0b4482863ce8ae5c0459272355))

### Fixed

- Links now should open in your default browser ([fa4b509](https://github.com/e6Hub/app/commit/fa4b509e2715ebad912fb6a4e32cee37d7ecdf9e))

## [3.6.0](https://github.com/e6Hub/app/compare/v3.5.2...v3.6.0) - 2020-11-27

### Added

- Add pool support ([6d8e7aa](https://github.com/e6Hub/app/commit/6d8e7aa7639dbf1f5b5702bf6101804b7f0b3e97))

### Changed

- App storage now is modular ([bcde5a5](https://github.com/e6Hub/app/commit/bcde5a59970c7f0bc97e4a9d128025c01035c5d7))
- New color pallete for UI ([d59fa3a](https://github.com/e6Hub/app/commit/d59fa3a4e49416114119ee04ac4a7ac16c3ae3de), [
6fc14fd](https://github.com/e6Hub/app/commit/6fc14fdf645bc650af52e62df750b934ca353948))
- Some elements now can't be selected by user ([b5b7b51](https://github.com/e6Hub/app/commit/b5b7b5130891ca6b63d0a47b65628b37af9618f1))
- New transition effect ([d59fa3a](https://github.com/e6Hub/app/commit/d59fa3a4e49416114119ee04ac4a7ac16c3ae3de))
- Download cards changed to PostView ([d59fa3a](https://github.com/e6Hub/app/commit/d59fa3a4e49416114119ee04ac4a7ac16c3ae3de))
- Updated DText parser to 0.5.0 ([f90c979](https://github.com/e6Hub/app/commit/f90c97922a8f66ec309fe5d9589ae256b86a7d87))

### Removed

- Removed window border ([7835889](https://github.com/e6Hub/app/commit/78358893fa633a96fd49287644eef36ce83de4bc))

### Fixed

- Fix for endless scroll pagination ([b5b7b51](https://github.com/e6Hub/app/commit/b5b7b5130891ca6b63d0a47b65628b37af9618f1))
- Settings: Fix Downloads tab ([ab47482](https://github.com/e6Hub/app/commit/ab47482cae95f1e86da045d81b4d9838758dc2de))
- Fix repeated downloads ([1c06715](https://github.com/e6Hub/app/commit/1c067154e09d25621f4f6b4a2a1bdaa08795c0fb))
