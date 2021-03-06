#!/usr/bin/env bash
lerna run --scope @types/manifesto build
lerna run --scope @types/mirador-core-model build
lerna run --scope @mirador/configuration build
lerna run --scope @mirador/i18n build
lerna run --scope @mirador/core build
lerna run --scope @mirador/custom-components build
lerna run --scope @mirador/react-components build
lerna run --scope @mirador/react-implementation build
