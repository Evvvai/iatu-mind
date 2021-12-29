const toggleDrawer = (open: any, setIsOpen: any) => (event: any) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return
  }

  setIsOpen(open)
}

export default toggleDrawer
