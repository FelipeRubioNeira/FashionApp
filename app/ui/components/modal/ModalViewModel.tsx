import { ModalCmpProps } from '@/ui/UITypes';
import { useState } from 'react';



const useModal = () => {

    const [config, setConfig] = useState<ModalCmpProps>({
        isVisible: false,
        title: "",
        message: "",
        buttonList: [],
        children: null
    });

    const openModal = (newConfig: Omit<ModalCmpProps, "isVisible">) => {
        setConfig({
            ...config,
            ...newConfig,
            isVisible: true
        });

    };

    const closeModal = () => {
        setConfig({ ...config, isVisible: false });
    };

    return {
        config,
        openModal,
        closeModal
    };
};

export default useModal;