import { useState } from "react";
import { ModalCmpProps, ButtonCmpProps } from "app/ui/UITypes";

const useModal = (initialState: Partial<ModalCmpProps> = {}) => {
    
    const {
        visible: initialVisible = false,
        title = "Modal",
        buttonList = [{ label: "Aceptar", onPress: () => {} }],
    } = initialState;

    const [visible, setVisible] = useState(initialVisible);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return {
        visible,
        title,
        buttonList,
        showModal,
        hideModal,
    }
};

export default useModal;