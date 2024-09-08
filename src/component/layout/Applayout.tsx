import React from 'react'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
  return (
    // 태그가 두개 이상이면 <> </>로 감싼다?
    <>
    <div>Applayout</div>
    {/* Outlet태그를 설정하여 Applayout컴포넌트의 자식태그까지 호출할 수 있게 한다. */}
    <Outlet />   
    </>
  )
}

export default Applayout