declare module '@mirador/react-component' {
    export function MiradorComponent(store: any)
    export function configReducer()
    export function infoResponsesReducer()
    export function manifestsReducer()
    export function viewersReducer()
    export function windowsReducer()
    export function workspaceReducer()
    export function addWindow(options: any)
    export function removeWindow(windowId: string)
    export function setConfig(config: any)
    export function setWorkspaceAddVisibility(isWorkspaceAddVisible: boolean)
    export function fetchManifest(uri: any)
}
