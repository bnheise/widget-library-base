import ClayIcon from '@clayui/icon';
import React, { CSSProperties, FC } from 'react'

type Props = {
  url?: string;
}

const avatarStyle: CSSProperties = {
  height: "32px",
  width: "32px",
  borderRadius: "50%",
  marginRight: "8px",
  backgroundColor: "var(--color-neutral-3)",
  position: "relative",
}

const iconWrapper: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}

const iconStyle: CSSProperties = {
  position: "relative",
  top: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const Avatar: FC<Props> = ({ url }) => {
  const urlProvided = url !== undefined && url.length > 0;

  return (
    <div style={avatarStyle}>
      {
        urlProvided ?
          <img style={avatarStyle} src={url} /> :
          <div style={iconWrapper}><ClayIcon style={iconStyle} symbol='user' /></div>
      }
    </div>

  )
}

export default Avatar