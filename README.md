## Mirador Monorepo
[![CircleCI](https://circleci.com/gh/ubl-chj/mirador-monorepo.svg?style=shield)](https://circleci.com/gh/ubl-chj/mirador-monorepo)
[![Netlify Status](https://api.netlify.com/api/v1/badges/09e9855d-7322-4056-9b26-82b05a3ad656/deploy-status)](https://app.netlify.com/sites/sleepy-curie-a284a7/deploys)

This contains https://github.com/ProjectMirador/mirador split into distribution packages.

1. `mirador-react-component` : An importable React Component.
2. `mirador-viewer` : The default implementation of the mirador-react-component.
3. `mirador-react-implementation` : A React implementation of the mirador-react-component.

### Synchronize upstream (pre-release)
To pull ProjectMirador/Mirador into packages, execute this:

```bash
git subtree pull --prefix packages/mirador-viewer https://github.com/ProjectMirador/mirador.git master
```
### End to End Testing in Development Mode
1. Install all package dependencies
```bash
$ lerna bootstrap --hoist
```
2. Create a bundle of the component.
```bash
$ lerna run bundle
$ lerna run --scope mirador-react-implementation start
$ lerna run cypress:open
```

### Continuous Deployment (WIP)
https://sleepy-curie-a284a7.netlify.com/
