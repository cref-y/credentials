export const getPageTitle = (pathname: string) => {
    if (pathname === '/') return 'Dashboard'
    if (pathname === '/wallet') return 'Wallet'
    if (pathname === '/create') return 'Create Certificate'
    if (pathname === '/collection') return 'NFT Collection'
    if (pathname === '/admin') return 'Admin Panel'
    if (pathname === '/settings') return 'Settings'
    return ''
}