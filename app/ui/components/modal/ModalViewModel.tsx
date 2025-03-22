import { useState } from "react";
import { ModalCmpProps } from "app/ui/UITypes";
import { container } from "tsyringe";
import { Translation, TranslationKeys } from "@/ui/i18n";


// ----------- DI ----------- //
const translation = container.resolve(Translation);



const useModal = (initialState: Partial<ModalCmpProps> = {}) => {


    // -------------- hooks -------------- //
    const {
        visible: initialVisible = false,
        buttonList = [{
            label: translation.translate(TranslationKeys.okMessage),
            onPress: () => hideModal()
        }],
    } = initialState;


    // -------------- state -------------- //
    const [visible, setVisible] = useState(initialVisible);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");


    // -------------- methods -------------- //
    const showModal = ({
        title,
        message,
    }: {
        title?: string,
        message?: string,
    }) => {
        if (title) setTitle(title);
        if (message) setMessage(message);
        setVisible(true);
    }

    const hideModal = () => setVisible(false);


    // -------------- return -------------- //
    return {
        visible,
        title,
        message,
        buttonList,
        showModal,
        hideModal,
    }
};

export default useModal;