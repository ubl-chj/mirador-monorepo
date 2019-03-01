import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

/**
 */
export const WorkspaceExport = (props) => {
  const exportableState = () => {
    const { state } = props
    const { config, windows } = state

    return JSON.stringify({
      config,
      windows,
    }, null, 2)
  }

  const {
    handleClose, open, children, t,
  } = props
  return (
    <Dialog id="workspace-settings" open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">{t('downloadExport')}</DialogTitle>
      <DialogContent>
        {children}
        <pre>
          {open ? exportableState() : null}
        </pre>
      </DialogContent>
    </Dialog>
  )
}
