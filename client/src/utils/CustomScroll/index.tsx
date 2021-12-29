import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars'

const renderThumb = ({ style, ...props }: any) => {
  const thumbStyle = {
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
  return <div style={{ ...style, ...thumbStyle }} {...props} />
}

export const CustomScroll = (props: ScrollbarProps) => (
  <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb} {...props} />
)
