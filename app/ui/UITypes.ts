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

type ButtonListCmpProps = {
    buttonList: ButtonCmpProps[]
}

type ModalType = "message" | "form"

type ModalCmpProps = {
    isVisible: boolean,
    title?: string,
    message?: string,
    children?: React.ReactNode,
    buttonList?: ButtonCmpProps[],
    modalType?: ModalType,
}



type ButtonCmpProps = {
    label: string,
    style?: TextStyle,
    onPress: () => void,
}

type ModalMessageProps = {
    title?: string,
    message?: string,
    buttonList?: ButtonCmpProps[],
}




// -------- --- export ----------- //
export type {
    ActionButton,
    ButtonCmpProps,
    ModalCmpProps,
    ModalMessageProps,
    ButtonListCmpProps
}