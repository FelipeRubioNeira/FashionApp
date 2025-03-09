import { TouchableOpacity } from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg'


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
    source: React.FC<SvgProps>;
    size?: number;
    color?: string;
    onPress?: () => void;
}


const IconImage = ({
    source: SvgIcon,
    size = 24,
    color = "#000",
    onPress
}: IconImageProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <SvgIcon
                width={size}
                height={size}
                fill={color}
            />
        </TouchableOpacity>
    )
}

export default IconImage