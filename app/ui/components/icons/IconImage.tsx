import { TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg'
import Colors from 'app/ui/constants/colors';


/**
 * IconImageProps
 * 
 * @source: React.FC<SvgProps> - The source of the icon, located in the iconImages folder.
 * @size: number - The size of the icon. Default is 24.
 * @color: string - The color of the icon. Default is #000.
 * @onPress: () => void - The function to be called when the icon is pressed.
 * 
 */
interface IconImageProps {
    source: React.FC<SvgProps>
    stroke?: string
    size?: number
    color?: string
    containerStyle?: ViewStyle,
    style?: ViewStyle
    onPress?: () => void
}


const IconImage = ({
    source: SvgIcon,
    size = 24,
    color = Colors.BLACK,
    onPress,
    containerStyle = {},
    style = {},
}: IconImageProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <SvgIcon
                width={size}
                height={size}
                color={color}
                style={style}
            />
        </TouchableOpacity>
    )
}

export default IconImage