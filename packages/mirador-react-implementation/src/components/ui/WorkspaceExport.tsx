import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

/**
 */
export class WorkspaceExport extends React.Component<any, any> {
  state: any
  handleClose: any
  open: any
  t: any

  exportableState() {
    const { state } = this.props
    const { config, windows } = state

    return JSON.stringify({
      config,
      windows,
    }, null, 2)
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children, t,
    } = this.props
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('downloadExport')}</DialogTitle>
        <DialogContent>
          {children}
          <pre>
            {open ? this.exportableState() : null}
          </pre>
        </DialogContent>
      </Dialog>
    )
  }
}
