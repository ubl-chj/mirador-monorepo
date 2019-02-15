## Mirador Monorepo
[![CircleCI](https://circleci.com/gh/ubl-chj/mirador-monorepo.svg?style=shield)](https://circleci.com/gh/ubl-chj/mirador-monorepo)

This contains https://github.com/ProjectMirador/mirador split into distribution packages.

1. `mirador-component` : An importable React Component.
2. `mirador-viewer` : The default implementation of the mirador-component.
3. `mirador-custom-implementation` : A custom implementation of the mirador-component.

### Synchronize upstream (pre-release)
To pull ProjectMirador/Mirador into packages, execute this:

```bash
git subtree pull --prefix packages/mirador-viewer https://github.com/ProjectMirador/mirador.git master
```
### End to End Testing in Development Mode
1. Install all package dependencies
1. Create a bundle of the component.
```bash
$ lerna run bundle
$ lerna run --scope mirador-custom-implementation start
$ lerna run cypress:open
```

