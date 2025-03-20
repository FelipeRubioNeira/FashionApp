import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from 'app/ui/constants/screenDimensions'
import { FontSize } from 'app/ui/constants/fonts'
import LabelCmp from '../LabelCmp'
import { ButtonCmpProps, ModalCmpProps } from 'app/ui/UITypes'


interface ButtonListCmpProps {
  buttonList: Array<ButtonCmpProps>
}

const ModalCmp = ({
  visible = false,
  title = "Title default",
  children,
  buttonList = [{ label: "Aceptar", onPress: () => { } }],
  hide = () => { },
}: ModalCmpProps) => {


  // --------------- componentes internos --------------- //
  const ButtonListCmp = ({ buttonList }: ButtonListCmpProps) => {
    return (
      <>
        {
          buttonList.map(({ label, style, onPress }, index) => (

            // boton indivual que se renderiza
            <TouchableOpacity
              key={index}
              style={[localStyles.modalButton, index !== 0 && { borderLeftWidth: 1 }]}
              onPress={onPress}
            >

              {/* label del boton */}
              <LabelCmp
                labelValue={label}
                style={{ ...localStyles.buttonLabel, ...style }}
              />

            </TouchableOpacity>
          ))
        }
      </>
    )
  }

  if (!visible) return null
  // --------------- render del componente principal --------------- //
  return (

    <KeyboardAvoidingView
      style={localStyles.background}
      behavior={Platform.OS === 'ios' ? 'padding' : "height"}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      < View style={localStyles.background} >



        {/* contenedor del modal */}
        <View style={localStyles.container}>

          {/* header */}
          <View style={localStyles.header}>
            <LabelCmp labelValue={title} />
          </View>

          {/* body */}
          <View style={localStyles.body}>
            {children}
          </View>

          {/* footer botones */}
          <View style={localStyles.footer}>
            <ButtonListCmp buttonList={buttonList} />
          </View>

        </View>

      </View >
    </KeyboardAvoidingView>

  )
}

export default ModalCmp

const localStyles = StyleSheet.create({

  background: {
    position: "absolute",
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'rgba(0 0 0 /0.5)',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    maxHeight: 500,
    minHeight: 200,
    width: "80%",
    maxWidth: 600,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "space-between"
  },
  header: {
    width: "100%",
    borderWidth: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  body: {
    maxHeight: 400,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 8,
  },
  message: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: FontSize.MEDIUM,
    fontWeight: "normal",
  },
  footer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  modalButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000000",
  },
  buttonLabel: {
    fontSize: FontSize.MEDIUM,
  }



})