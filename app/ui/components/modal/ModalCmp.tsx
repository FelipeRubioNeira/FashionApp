import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { screenHeight, screenWidth } from 'app/ui/constants/screenDimensions'
import { FONT_SIZE } from '@/ui/constants/fonts/sizes'
import LabelCmp from '../LabelCmp'
import { ButtonListCmpProps, ModalCmpProps } from 'app/ui/UITypes'
import globalStyles from '@/ui/constants/globalStyles/globalStyles'
import { FONT_FAMILY } from '@/ui/constants/fonts'
import Colors from '@/ui/constants/colors'


const ModalCmp = ({
  isVisible = false,
  title = "Title default",
  message = "Message default",
  children,
  modalType = "message",
  buttonList = [{ label: "Aceptar", onPress: () => { } }],
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
              style={[localStyles.modalButton, index !== 0 && { borderLeftWidth: .5 }]}
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

  const Message = ({ value }: { value: string }) => {
    return (
      <LabelCmp
        labelValue={value}
        style={localStyles.message}
      />
    )
  }

  if (!isVisible) return null
  // --------------- render del componente principal --------------- //
  return (

    <KeyboardAvoidingView
      style={localStyles.background}
      behavior={Platform.OS === 'ios' ? 'padding' : "height"}
    >
      < View style={localStyles.background} >
        {/* contenedor del modal */}
        <View style={localStyles.container}>

          {/* header */}
          <View style={localStyles.header}>
            <LabelCmp
              labelValue={title}
              style={{ ...globalStyles.TITLE, color: Colors.WHITE }}

            />
          </View>

          {/* body */}
          <View style={localStyles.body}>
            {
              modalType === "message" || message.length > 0 ?
                <Message value={message} />
                :
                children
            }
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
    //borderWidth: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.BLACK
  },
  body: {
    maxHeight: 400,
    justifyContent: "center",
    padding: 8,
  },
  message: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_LIGHT,
    fontWeight: "normal",
  },
  footer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: .5,
    borderColor: Colors.GRAY_TRANSPARENT,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  modalButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.GRAY_TRANSPARENT,
  },
  buttonLabel: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR
  }



})