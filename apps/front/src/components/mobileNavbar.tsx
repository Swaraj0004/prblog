import { PropsWithChildren } from 'react'
import SideBar from './ui/SideBar'
import { Bars3Icon } from '@heroicons/react/24/outline'

type Props = PropsWithChildren
const MobileNavbar = (props:Props) => {
  return (
    <div className="md:hidden">
      <SideBar triggerIcon={<Bars3Icon className="w-4" />}
        triggerIconClassName="absolute top-2">
        {props.children}
      </SideBar>
    </div>
  )
}

export default MobileNavbar
