/**
 * @file UITypes.ts
 * 
 * 
 * Se definen todos los tipos relacionados a la UI y las interacciones de usuario
 */

import { TextStyle } from "react-native"


// -------- --- types ----------- //
interface ActionButton {
    onPress: () => void
}

interface ModalCmpProps {
    title?: string,
    children?: React.ReactNode,
    buttonList?: Array<ButtonCmpProps>,
    visible: boolean,
    hide: () => void,
}

interface ButtonCmpProps {
    label: string,
    style?: TextStyle,
    onPress: () => void,
}



// -------- --- export ----------- //
export type {
    ActionButton,
    ButtonCmpProps,
    ModalCmpProps
}