import React from 'react'
import SideBar from '../components/Molecules/SideBar'
import TopBar from '../components/Molecules/TopBar'
import Boxlayer from '../components/Molecules/Boxlayer'
import Middlefile from '../components/Molecules/Middlefile'
import ClientSum from '../components/Molecules/ClientSum'

const AgentHome = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-orange-100 to-purple-100">
      <SideBar />
      <TopBar />
      <div className="flex-1 ml-[6rem] max-w-screen overflow-hidden">
        <Boxlayer />
        <Middlefile/>
        <ClientSum/>
      </div>
    </div>
  )
}

export default AgentHome
