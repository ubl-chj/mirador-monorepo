## Mirador Monorepo

This contains https://github.com/ProjectMirador/mirador split into distribution packages.

1. `mirador-component` : An importable React Component.
2. `mirador-viewer` : The default implementation of the mirador-component.
3. `mirador-custom-implementation` : A custom implementation of the mirador-component.

### Synchronize upstream (pre-release)
To pull ProjectMirador/Mirador into packages, execute this:

```bash
git subtree pull --prefix packages/mirador-viewer https://github.com/ProjectMirador/mirador.git master
```
