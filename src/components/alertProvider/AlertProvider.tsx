import ClayAlert from '@clayui/alert'
import React, { FC } from 'react'

export type ToastKey = "success" | "failure";

type Props = {
  toastItems: Map<string, [ToastKey, string]>,
  setToastItems: React.Dispatch<React.SetStateAction<Map<string, [ToastKey, string]>>>
}

const AlertProvider: FC<Props> = ({ toastItems, setToastItems }) => {
  return (
    <ClayAlert.ToastContainer>
      {Array.from(toastItems.entries()).map(([key, [toastKey, value]], idx) => {
        return <ClayAlert
          autoClose={toastKey === "success" ? 5000 : undefined}
          displayType={toastKey === "failure" ? "danger" : "success"}
          key={`${key}-${idx}`}

          onClose={() => {
            setToastItems(prevItems => {
              prevItems.delete(key);
              return new Map(prevItems);
            }
            );
          }}
          title={toastKey === "failure" ? "An error occured:" : "Request successful:"}
        >{value}</ClayAlert>
      })}
    </ClayAlert.ToastContainer>
  )
}

export default AlertProvider