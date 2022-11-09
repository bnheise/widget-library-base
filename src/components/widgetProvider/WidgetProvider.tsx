import { ClayIconSpriteContext } from '@clayui/icon'
import React, { FC, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Context } from '../../init'
import AppContext from '../../contexts/appContext'
import Switcher from '../../Switcher'
import { getSpriteUrl } from '../../util/liferay'
import AlertProvider, { ToastKey } from '../alertProvider/AlertProvider'

type Props = {
  internalContext: AppContext
}

const WidgetProvider: FC<Props> = ({ internalContext }) => {
  const [toastItems, setToastItems] = useState<Map<string, [ToastKey, string]>>(new Map());
  internalContext.setSetToastItems(setToastItems);
  return (
    <Context.Provider value={internalContext}>
      <BrowserRouter>
        <ClayIconSpriteContext.Provider value={getSpriteUrl()}>
          <Switcher />
          <AlertProvider toastItems={toastItems} setToastItems={setToastItems} />
        </ClayIconSpriteContext.Provider>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default WidgetProvider